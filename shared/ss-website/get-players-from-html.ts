import * as cheerio from "cheerio";
import { PlayerInfo } from "./types";

export const getPlayersFromHtml = (website: string): PlayerInfo[] => {
  const root = cheerio.load(website);

  const entries = root(".tLeftDiv")
    .eq(1)
    .children()
    .first()
    .children()
    .children()
    .map((_, el) => {
      const loadedEl = cheerio.load(el);
      const name = loadedEl("td:nth-of-type(1)").text();
      const rank = loadedEl("td:nth-of-type(2)").text();

      return { name, rank };
    })
    .get();

  return entries.filter((entry) => entry.name !== undefined && entry.rank !== undefined);
};
