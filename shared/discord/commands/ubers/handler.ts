import { EmbedBuilder } from "discord.js";
import { UbersSubcommands } from ".";
import { InvalidParametersError } from "../../../errors/invalid-parameters.error";
import { InvalidSubcommandError } from "../../../errors/invalid-subcommand.error";
import { UbersRepository } from "../../../ubers/ubers.repository";
import { Handler } from "../../event.type";
import { UbersList } from "./ubers-list";
import { createDynamoDbDocumentClient } from "../../../aws/factories";
import { logger } from "../../../logger";

const ubersRepository = new UbersRepository({ client: createDynamoDbDocumentClient(), logger });

export const ubersHandler = (): Handler => async (event) => {
  const subcommand = event.data.options[0].name as UbersSubcommands;
  const { options } = event.data.options[0] as any;

  switch (subcommand) {
    case UbersSubcommands.Clear: {
      await ubersRepository.clearGalaxies();

      return {
        content: "Cleared (`･ω･´)ゞ",
      };
    }

    case UbersSubcommands.Set: {
      const name = options.find((option: any) => option.name === "name")?.value;
      const galaxy = options.find((option: any) => option.name === "galaxy")?.value;

      if (!name || !UbersList.includes(name) || !galaxy) {
        throw new InvalidParametersError();
      }

      await ubersRepository.updateGalaxy(name, galaxy);

      return {
        content: `Done! ${name} now resides in ${galaxy}`,
      };
    }

    case UbersSubcommands.List: {
      const ubers = await ubersRepository.getUbers();

      return {
        embeds: [
          new EmbedBuilder()
            .setTitle("**List of ubers**")
            .setColor(0xff0000)
            .addFields([
              { name: "Name", value: ubers.map((uber) => uber.name).join("\n"), inline: true },
              { name: "Galaxy", value: ubers.map((uber) => uber.galaxy || "Unknown").join("\n"), inline: true },
            ]),
        ],
      };
    }

    default:
      throw new InvalidSubcommandError(subcommand);
  }
};
