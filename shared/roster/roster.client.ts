import { GoogleAuth, CredentialBody } from "google-auth-library";
import { google, sheets_v4 } from "googleapis";
import { Logger } from "../logger";
import { PlayerInfo } from "../ss-website/types";

interface RosterClientDependencies {
  logger: Logger;
  googleCredentials: CredentialBody;
  spreadsheetId: string;
}

const rawRosterRange = "Raw Roster!A3:B";
const unassignedRange = "Unassigned Chars!B2:C";

export class RosterClient {
  api: sheets_v4.Sheets;

  constructor(private dependencies: RosterClientDependencies) {
    const auth = new GoogleAuth({
      scopes: "https://www.googleapis.com/auth/spreadsheets",
      credentials: this.dependencies.googleCredentials,
    });

    this.api = google.sheets({ version: "v4", auth });
  }

  async updateRawRosterData(values: PlayerInfo[]) {
    const { spreadsheetId, logger } = this.dependencies;

    logger.info("Clearing raw roster data");
    await this.api.spreadsheets.values.clear({
      range: rawRosterRange,
      spreadsheetId,
      requestBody: {
        range: rawRosterRange,
      },
    });

    logger.info("Inserting new raw roster data");
    await this.api.spreadsheets.values.update({
      range: rawRosterRange,
      valueInputOption: "RAW",
      spreadsheetId,
      requestBody: {
        range: rawRosterRange,
        majorDimension: "ROWS",
        values: values.map((row) => [row.name, row.rank]),
      },
    });
  }

  async getUnassignedCharacters(): Promise<PlayerInfo[]> {
    const { spreadsheetId, logger } = this.dependencies;

    logger.info("Fetching unassigned characters");

    const unassigned = await this.api.spreadsheets.values.get({
      range: unassignedRange,
      spreadsheetId,
    });

    return (
      unassigned.data.values?.map((item) => ({
        name: item[0],
        rank: item[1],
      })) || []
    );
  }
}
