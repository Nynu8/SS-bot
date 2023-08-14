import { z } from "zod";
import { pipeline } from "ts-pipe-compose";

const loadEnvs = (env: any) => ({
  publicKey: env.DISCORD_PUBLIC_KEY,
});

const validateConfig = (config: any) => {
  const schema = z.object({
    publicKey: z.string(),
  });

  try {
    return schema.parse(config);
  } catch (error) {
    throw new Error(error as string);
  }
};

export const createConfig = pipeline(loadEnvs, validateConfig);
