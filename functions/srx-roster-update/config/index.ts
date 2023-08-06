import { z } from "zod";
import { pipeline } from "ts-pipe-compose";
import { CredentialBody } from "google-auth-library";

const loadEnvs = (env: any) => ({
  rosterGoogleCredentials: env.ROSTER_GOOGLE_CREDENTIALS,
  rosterSpreadsheetId: env.ROSTER_SPREADSHEET_ID,
});

const validateConfig = (config: any) => {
  const schema = z.object({
    rosterGoogleCredentials: z.string().transform<CredentialBody>((str, ctx) => {
      try {
        return JSON.parse(str);
      } catch (err) {
        ctx.addIssue({ code: "custom", message: "Invalid credentials JSON" });
        return z.NEVER;
      }
    }),
    rosterSpreadsheetId: z.string(),
  });

  try {
    return schema.parse(config);
  } catch (error) {
    throw new Error(error as string);
  }
};

export const createConfig = pipeline(loadEnvs, validateConfig);
