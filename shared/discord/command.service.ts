import {
  APIApplicationCommandInteraction,
  BaseMessageOptions,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandBuilder,
} from "discord.js";
import { DiscordServices } from "./api";
import { MissingCommandError } from "../errors/missing-command.error";
import { pingmeCommand, pingmeHandler } from "./commands/pingme";
import { savingsCommand, savingsHandler } from "./commands/savings";
import { manhoursCommand, manhoursHandler } from "./commands/manhours";
import { extractionCommand, extractionHandler } from "./commands/extraction";
import { scanCommand, scanHandler } from "./commands/scan";

interface CommandServiceDependencies {
  discordServices: DiscordServices;
}

export class CommandService {
  commands: { name: string; command: Partial<SlashCommandBuilder>; handle: any }[];

  constructor(private dependencies: CommandServiceDependencies) {
    this.commands = [
      {
        name: pingmeCommand.name,
        command: pingmeCommand,
        handle: pingmeHandler({ roleService: this.dependencies.discordServices.roleService }),
      },
      {
        name: savingsCommand.name,
        command: savingsCommand,
        handle: savingsHandler(),
      },
      {
        name: manhoursCommand.name,
        command: manhoursCommand,
        handle: manhoursHandler(),
      },
      {
        name: extractionCommand.name,
        command: extractionCommand,
        handle: extractionHandler(),
      },
      {
        name: scanCommand.name,
        command: scanCommand,
        handle: scanHandler(),
      },
    ];
  }

  getCommandData(): RESTPostAPIChatInputApplicationCommandsJSONBody[] {
    return this.commands.map((command) => command.command.toJSON!());
  }

  async execute(interaction: APIApplicationCommandInteraction): Promise<BaseMessageOptions> {
    const command = this.commands.find((cmd) => cmd.name === interaction.data.name);

    if (!command) {
      throw new MissingCommandError();
    }

    return command.handle(interaction);
  }
}
