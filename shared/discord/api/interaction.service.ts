import {
  BaseMessageOptions,
  InteractionResponseType,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import { DiscordApiDependencies } from ".";

export class InteractionService {
  constructor(private dependencies: DiscordApiDependencies) {}

  async defer(interactionId: string, interactionToken: string) {
    await this.dependencies.restApi.post(Routes.interactionCallback(interactionId, interactionToken), {
      body: {
        type: InteractionResponseType.DeferredChannelMessageWithSource,
      },
    });
  }

  async updateResponse(applicationId: string, interactionToken: string, body: BaseMessageOptions) {
    await this.dependencies.restApi.patch(Routes.webhookMessage(applicationId, interactionToken), {
      body,
    });
  }

  async registerCommands(
    clientId: string,
    guildId: string,
    commands: RESTPostAPIChatInputApplicationCommandsJSONBody[],
  ) {
    await this.dependencies.restApi.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });
  }
}
