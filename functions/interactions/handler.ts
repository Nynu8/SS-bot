import middy from "@middy/core";
import { verifyKey } from "discord-interactions";
import StatusCodes from "http-status-codes";
import { createConfig } from "./config";
import { logger } from "../../shared/logger";
import { errorHandler } from "../../shared/middlewares/error-handler";
import { APIGatewayEvent } from "aws-lambda";
import { awsLambdaResponse } from "../../shared/aws/response";
import { APIInteraction, InteractionResponseType, InteractionType } from "discord.js";
import { CommandService } from "../../shared/discord/command.service";
import { createDiscordApi } from "../../shared/discord/api";

const config = createConfig(process.env);
const discordServices = createDiscordApi({ authToken: config.token });
const commandService = new CommandService({ discordServices });

const lambdaHandler = async ({ body, headers }: APIGatewayEvent) => {
  logger.info(body);
  logger.info(headers);

  const signature = headers["x-signature-ed25519"];
  const timestamp = headers["x-signature-timestamp"];

  if (!body || !signature || !timestamp) {
    return awsLambdaResponse(StatusCodes.BAD_REQUEST);
  }

  const isValidRequest = verifyKey(body, signature, timestamp, config.publicKey);
  if (!isValidRequest) {
    return awsLambdaResponse(StatusCodes.BAD_REQUEST);
  }

  const interaction: APIInteraction = JSON.parse(body);
  switch (interaction.type) {
    case InteractionType.Ping:
      return awsLambdaResponse(StatusCodes.OK, {
        type: InteractionResponseType.Pong,
      });

    case InteractionType.ApplicationCommand:
      {
        await discordServices.interactionService.defer(interaction.id, interaction.token);

        const res = await commandService.execute(interaction);
        await discordServices.interactionService.updateResponse(interaction.application_id, interaction.token, res);
      }
      break;

    default:
      logger.info(`Unhandled interaction type ${interaction.type}`);
  }

  return awsLambdaResponse(StatusCodes.OK);
};

export const handle = middy().use(errorHandler()).handler(lambdaHandler);
