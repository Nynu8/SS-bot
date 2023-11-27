import { APIChatInputApplicationCommandGuildInteraction, BaseMessageOptions } from "discord.js";

export type DiscordEvent = Omit<APIChatInputApplicationCommandGuildInteraction, "data"> & {
  data: Omit<APIChatInputApplicationCommandGuildInteraction["data"], "options"> & {
    options: { name: string; value: string; type: number }[];
  };
};

export type Handler = (event: DiscordEvent) => Promise<BaseMessageOptions>;
