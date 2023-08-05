import middy from "@middy/core";
import { createConfig } from "./config";
import { fetchPlayersFromWebsite } from "../../shared/ss-website/fetch-players-from-website";
import { PlayerListRepository } from "../../shared/player-data/player-list.repository";
import { createDynamoDbDocumentClient } from "../../shared/aws/factories";
import { logger } from "../../shared/logger";
import { NotificationService } from "../../shared/discord/notification.service";
import { errorHandler } from "../../shared/middlewares/error-handler";

const config = createConfig(process.env);
const playerListRepository = new PlayerListRepository({
  client: createDynamoDbDocumentClient(),
});
const notificationService = new NotificationService({
  webhookUrl: config.memberNotificationWebhookUrl,
});

const lambdaHandler = async () => {
  logger.info("Starting team refreshing");
  const teams = await playerListRepository.getTeamList();

  await Promise.all(
    Object.keys(teams).map(async (teamName) => {
      try {
        logger.info(`Fetching website data for team ${teamName}`);
        const sitePlayernames = await fetchPlayersFromWebsite(teams[teamName]);

        logger.info(`Fetching DB data for team ${teamName}`);
        const dbPlayernames = await playerListRepository.getPlayersFromTeam(teamName);

        const joined = sitePlayernames.filter((playername) => !dbPlayernames.includes(playername));
        const left = dbPlayernames.filter((playername) => !sitePlayernames.includes(playername));

        if (joined.length > 0 || left.length > 0) {
          logger.info(`Updating DB data for team ${teamName}`);
          await playerListRepository.savePlayers(joined, left, teamName);

          logger.info(`Notifying about changes to ${teamName}`);
          await notificationService.notifyTeamMonitor(teamName, joined, left);
        }
      } catch (err) {
        await notificationService.notifyFailedTeamUpdate(teamName);
        logger.error(err);
      }
    }),
  );
};

export const handle = middy().use(errorHandler()).handler(lambdaHandler);
