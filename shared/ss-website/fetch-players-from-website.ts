import axios from "axios";
import { getPlayersFromHtml } from "./get-players-from-html";
import { PlayerInfo } from "./types";

export const fetchPlayersFromWebsite = async (url: string): Promise<PlayerInfo[]> => {
  const response = await axios.get(url);

  return getPlayersFromHtml(response.data);
};
