import * as https from "https";
import axios from "axios";
import { getPlayersFromHtml } from "./get-players-from-html";
import { PlayerInfo } from "./types";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const fetchPlayersFromWebsite = async (url: string): Promise<PlayerInfo[]> => {
  const response = await axios.get(url, { httpsAgent });

  return getPlayersFromHtml(response.data);
};
