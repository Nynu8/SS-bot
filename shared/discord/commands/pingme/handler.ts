import { RoleService } from "../../api/role.service";
import { Handler } from "../../event.type";
import { RoleMappings } from "./role-mappings";

interface PingmeHandlerDependencies {
  roleService: RoleService;
}

export const pingmeHandler =
  ({ roleService }: PingmeHandlerDependencies): Handler =>
  async (event) => {
    const action = event.data.options?.find((option) => option.name === "action")?.value;
    const roleId = event.data.options?.find((option) => option.name === "role")?.value;

    if (!action || !roleId) {
      throw new Error("No action or roleId provided");
    }

    if (action === "add") {
      await Promise.all(
        roleId === "all"
          ? RoleMappings.map((role) => roleService.addMemberRole(event.guild_id, event.member.user.id, role.id))
          : [roleService.addMemberRole(event.guild_id, event.member.user.id, roleId)],
      );
    } else {
      await Promise.all(
        roleId === "all"
          ? RoleMappings.map((role) => roleService.removeMemberRole(event.guild_id, event.member.user.id, role.id))
          : [roleService.removeMemberRole(event.guild_id, event.member.user.id, roleId)],
      );
    }

    return { content: "Done ૮ ˶ᵔ ᵕ ᵔ˶ ა" };
  };
