import middy from "@middy/core";
import { logger } from "../../shared/logger";
import { createConfig } from "./config";
import { errorHandler } from "../../shared/middlewares/error-handler";
import { CommandService } from "../../shared/discord/command.service";
import { createDiscordApi } from "../../shared/discord/api";

const config = createConfig(process.env);
const discordServices = createDiscordApi({ authToken: config.token });
const commandService = new CommandService({ discordServices });

const lambdaHandler = async () => {
  logger.info("Refreshing interactions");

  await discordServices.interactionService.registerCommands(
    config.clientId,
    config.guildId,
    commandService.getCommandData(),
  );
};

export const handle = middy().use(errorHandler()).handler(lambdaHandler);
