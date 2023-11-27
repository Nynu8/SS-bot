import { REST } from "discord.js";
import { InteractionService } from "./interaction.service";
import { RoleService } from "./role.service";

interface CreateDiscordApiDependencies {
  authToken: string;
}

export interface DiscordApiDependencies {
  restApi: REST;
}

export interface DiscordServices {
  interactionService: InteractionService;
  roleService: RoleService;
}

export const createDiscordApi = (dependencies: CreateDiscordApiDependencies): DiscordServices => {
  const restApi = new REST();
  restApi.setToken(dependencies.authToken);

  return {
    interactionService: new InteractionService({ restApi }),
    roleService: new RoleService({ restApi }),
  };
};
