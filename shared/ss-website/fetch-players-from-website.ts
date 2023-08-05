import axios from "axios";
import { getPlayersFromHtml } from "./get-players-from-html";

export const fetchPlayersFromWebsite = async (url: string): Promise<string[]> => {
  const response = await axios.get(url);

  return getPlayersFromHtml(response.data);
};
