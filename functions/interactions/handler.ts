import middy from "@middy/core";
import { verifyKey } from "discord-interactions";
import StatusCodes from "http-status-codes";
import { createConfig } from "./config";
import { logger } from "../../shared/logger";
import { errorHandler } from "../../shared/middlewares/error-handler";
import { APIGatewayEvent } from "aws-lambda";
import { awsLambdaResponse } from "../../shared/aws/response";
import { InteractionResponseType } from "discord.js";

const config = createConfig(process.env);

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

  const request = JSON.parse(body);
  if (request.type === 1) {
    return awsLambdaResponse(StatusCodes.OK, {
      type: InteractionResponseType.Pong,
    });
  }

  return awsLambdaResponse(StatusCodes.OK);
};

export const handle = middy().use(errorHandler()).handler(lambdaHandler);
