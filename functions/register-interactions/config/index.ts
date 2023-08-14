import { z } from "zod";
import { pipeline } from "ts-pipe-compose";

const loadEnvs = (env: any) => ({
  clientId: env.DISCORD_CLIENT_ID,
  guildId: env.SRX_GUILD_ID,
  token: env.BOT_TOKEN,
});

const validateConfig = (config: any) => {
  const schema = z.object({
    clientId: z.string(),
    guildId: z.string(),
    token: z.string(),
  });

  try {
    return schema.parse(config);
  } catch (error) {
    throw new Error(error as string);
  }
};

export const createConfig = pipeline(loadEnvs, validateConfig);
