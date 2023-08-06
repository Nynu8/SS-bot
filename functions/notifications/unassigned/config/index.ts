import { z } from "zod";
import { pipeline } from "ts-pipe-compose";
import { CredentialSchema } from "../../../../shared/roster/credentials.schema";

const loadEnvs = (env: any) => ({
  rosterGoogleCredentials: env.ROSTER_GOOGLE_CREDENTIALS,
  rosterSpreadsheetId: env.ROSTER_SPREADSHEET_ID,
  rosterMonitoringWebhookUrl: env.ROSTER_MONITORING_WEBHOOK_URL,
});

const validateConfig = (config: any) => {
  const schema = z.object({
    rosterGoogleCredentials: CredentialSchema,
    rosterSpreadsheetId: z.string(),
    rosterMonitoringWebhookUrl: z.string().url(),
  });

  try {
    return schema.parse(config);
  } catch (error) {
    throw new Error(error as string);
  }
};

export const createConfig = pipeline(loadEnvs, validateConfig);
