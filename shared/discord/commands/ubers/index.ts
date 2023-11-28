import { SlashCommandBuilder } from "discord.js";
import { UbersList } from "./ubers-list";

export { ubersHandler } from "./handler";

export enum UbersSubcommands {
  List = "list",
  Set = "set",
  Clear = "clear",
}

export const ubersCommand = new SlashCommandBuilder()
  .setName("ubers")
  .setDescription("List of ubers and their galaxies")
  .addSubcommand((subcommand) => subcommand.setName("list").setDescription("Lists the ubers"))
  .addSubcommand((subcommand) =>
    subcommand
      .setName("set")
      .setDescription("Set ubers galaxy")
      .addStringOption((option) =>
        option
          .setName("name")
          .setDescription("Name of the uber")
          .addChoices(
            ...UbersList.map((uber) => ({
              name: uber,
              value: uber,
            })),
          )
          .setRequired(true),
      )
      .addStringOption((option) => option.setName("galaxy").setDescription("Galaxy (eg. Ayaya 8.3B").setRequired(true)),
  )
  .addSubcommand((subcommand) => subcommand.setName("clear").setDescription("Clears the ubers galaxies"));
