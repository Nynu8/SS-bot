import { SlashCommandBuilder } from "discord.js";

export { extractionHandler } from "./handler";

export const extractionCommand = new SlashCommandBuilder()
  .setName("extraction")
  .setDescription("Calculates extraction rate")
  .addIntegerOption((option) =>
    option.setName("no_extractors").setDescription("Number of extractors").setRequired(true).setMinValue(1),
  )
  .addNumberOption((option) =>
    option.setName("extraction_rate").setDescription("Rate of extraction (per day)").setRequired(true).setMinValue(1),
  )
  .addIntegerOption((option) =>
    option.setName("exe_level").setDescription("Extraction Expert level, default 0").setRequired(true),
  );
