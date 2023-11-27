import { SlashCommandBuilder } from "discord.js";

export { manhoursHandler } from "./handler";

export const manhoursCommand = new SlashCommandBuilder()
  .setName("manhours")
  .setDescription("Calculates amount of time the build will take")
  .addIntegerOption((option) =>
    option.setName("manhours").setDescription("Amount of manhours").setRequired(true).setMinValue(1),
  )
  .addIntegerOption((option) =>
    option.setName("workforce").setDescription("Amount of workforce").setRequired(true).setMinValue(1),
  )
  .addIntegerOption((option) =>
    option
      .setName("construction_speed")
      .setDescription("Bonus construction speed in %")
      .setRequired(true)
      .setMinValue(0)
      .setMaxValue(200),
  )
  .addIntegerOption((option) =>
    option.setName("buildcount").setDescription("Number of items to build").setRequired(true).setMinValue(1),
  );
