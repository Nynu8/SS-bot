import middy from "@middy/core";
import { createConfig } from "./config";
import { logger } from "../../shared/logger";
import { errorHandler } from "../../shared/middlewares/error-handler";
import { SQSEvent } from "aws-lambda";
import { PlayerInfo } from "../../shared/ss-website/types";
import { RosterClient } from "../../shared/roster/roster.client";

const config = createConfig(process.env);

const rosterClient = new RosterClient({
  logger,
  googleCredentials: config.rosterGoogleCredentials,
  spreadsheetId: config.rosterSpreadsheetId,
});

const lambdaHandler = async ({ Records }: SQSEvent) => {
  const playerInfo: PlayerInfo[] = JSON.parse(Records[0].body);

  await rosterClient.updateRawRosterData(playerInfo);
};

export const handle = middy().use(errorHandler()).handler(lambdaHandler);
