import { SlashCommandBuilder } from "discord.js";

export { scanHandler } from "./handler";

export const scanCommand = new SlashCommandBuilder()
  .setName("scan")
  .setDescription("Everything scan-sheet related")
  .addSubcommand((subcommand) => subcommand.setName("list").setDescription("Lists scanned systems"))
  .addSubcommand((subcommand) =>
    subcommand
      .setName("set")
      .setDescription("Sets the link to the spreadsheet")
      .addStringOption((option) =>
        option.setName("Spreadsheet URL").setDescription("URL of the spreadsheet").setRequired(true),
      ),
  )
  .addSubcommand((subcommand) =>
    subcommand.setName("unscanned").setDescription("Lists all systems that are not scanned"),
  );
