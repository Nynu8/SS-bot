import { z } from "zod";
import { pipeline } from "ts-pipe-compose";

const loadEnvs = (env: any) => ({
  runsWebhookUrl: env.RUNS_WEBHOOK_URL,
});

const validateConfig = (config: any) => {
  const schema = z.object({
    runsWebhookUrl: z.string().url(),
  });

  try {
    return schema.parse(config);
  } catch (error) {
    throw new Error(error as string);
  }
};

export const createConfig = pipeline(loadEnvs, validateConfig);
