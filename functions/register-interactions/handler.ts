import { REST, Routes, SlashCommandBuilder } from "discord.js";
import middy from "@middy/core";
import { logger } from "../../shared/logger";
import { createConfig } from "./config";
import { errorHandler } from "../../shared/middlewares/error-handler";

const config = createConfig(process.env);
const rest = new REST().setToken(config.token);

const lambdaHandler = async () => {
  logger.info("Refreshing interactions");

  await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
    body: [new SlashCommandBuilder().setName("test").setDescription("test").toJSON()],
  });
};

export const handle = middy().use(errorHandler()).handler(lambdaHandler);
