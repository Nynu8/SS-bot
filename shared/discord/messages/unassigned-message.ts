import { PlayerInfo } from "../../ss-website/types";

export const unassignedMessage = (playerInfo: PlayerInfo[]) =>
  ["## Daily unassigned reminder", "```", ...playerInfo.map((item) => `${item.name} - ${item.rank}`), "```"].join("\n");
