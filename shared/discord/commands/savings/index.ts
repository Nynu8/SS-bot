import { SlashCommandBuilder } from "discord.js";

export { savingsHandler } from "./handler";

export const savingsCommand = new SlashCommandBuilder()
  .setName("savings")
  .setDescription("Calculates build savings")
  .addIntegerOption((option) =>
    option.setName("buildcount").setDescription("Number of items to build").setRequired(true).setMinValue(1),
  );
