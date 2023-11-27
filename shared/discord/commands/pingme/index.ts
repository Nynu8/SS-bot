import { SlashCommandBuilder } from "discord.js";
import { RoleMappings } from "./role-mappings";

export { pingmeHandler } from "./handler";

export const pingmeCommand = new SlashCommandBuilder()
  .setName("pingme")
  .setDescription("Adds pingable role to the user")
  .addStringOption((option) =>
    option
      .setName("action")
      .setDescription("Add or remove role")
      .setRequired(true)
      .addChoices({ name: "add", value: "add" }, { name: "remove", value: "remove" }),
  )
  .addStringOption((option) =>
    option
      .setName("role")
      .setDescription("Role to add/remove")
      .setRequired(true)
      .addChoices({ name: "All", value: "all" }, ...RoleMappings.map((role) => ({ name: role.name, value: role.id }))),
  );
