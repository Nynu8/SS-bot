import { z } from "zod";
import { pipeline } from "ts-pipe-compose";
import { CredentialSchema } from "../../../shared/roster/credentials.schema";

const loadEnvs = (env: any) => ({
  rosterGoogleCredentials: env.ROSTER_GOOGLE_CREDENTIALS,
  rosterSpreadsheetId: env.ROSTER_SPREADSHEET_ID,
});

const validateConfig = (config: any) => {
  const schema = z.object({
    rosterGoogleCredentials: CredentialSchema,
    rosterSpreadsheetId: z.string(),
  });

  try {
    return schema.parse(config);
  } catch (error) {
    throw new Error(error as string);
  }
};

export const createConfig = pipeline(loadEnvs, validateConfig);
