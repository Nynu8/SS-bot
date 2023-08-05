import { z } from "zod";
import { pipeline } from "ts-pipe-compose";

const loadEnvs = (env: any) => ({
  memberNotificationWebhookUrl: env.MEMBER_NOTIFICATION_WEBHOOK_URL,
});

const validateConfig = (config: any) => {
  const schema = z.object({
    memberNotificationWebhookUrl: z.string().url(),
  });

  try {
    return schema.parse(config);
  } catch (error) {
    throw new Error(error as string);
  }
};

export const createConfig = pipeline(loadEnvs, validateConfig);
