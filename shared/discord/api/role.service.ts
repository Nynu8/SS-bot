import { Routes } from "discord.js";
import { DiscordApiDependencies } from ".";

export class RoleService {
  constructor(private dependencies: DiscordApiDependencies) {}

  async addMemberRole(guildId: string, userId: string, roleId: string) {
    await this.dependencies.restApi.put(Routes.guildMemberRole(guildId, userId, roleId));
  }

  async removeMemberRole(guildId: string, userId: string, roleId: string) {
    await this.dependencies.restApi.delete(Routes.guildMemberRole(guildId, userId, roleId));
  }
}
