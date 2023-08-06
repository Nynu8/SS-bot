import middy from "@middy/core";
import { createConfig } from "./config";
import { logger } from "../../../shared/logger";
import { errorHandler } from "../../../shared/middlewares/error-handler";
import { NotificationService } from "../../../shared/discord/notification.service";
import { RosterClient } from "../../../shared/roster/roster.client";

const config = createConfig(process.env);

const rosterClient = new RosterClient({
  logger,
  googleCredentials: config.rosterGoogleCredentials,
  spreadsheetId: config.rosterSpreadsheetId,
});
const notificationService = new NotificationService({
  webhookUrl: config.rosterMonitoringWebhookUrl,
});

const lambdaHandler = async () => {
  logger.info("Fetching unassigned characters");
  const unassignedCharacters = await rosterClient.getUnassignedCharacters();

  if (unassignedCharacters.length > 0) {
    logger.info("Notifying about unassigned characters");
    await notificationService.notifyUnassigned(unassignedCharacters);
  }
};

export const handle = middy().use(errorHandler()).handler(lambdaHandler);
