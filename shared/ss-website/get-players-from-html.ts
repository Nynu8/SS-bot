// @ts-nocheck
import * as cheerio from "cheerio";

export const getPlayersFromHtml = (website: string) => {
  const root = cheerio.load(website);

  const entries = root(".tLeftDiv")[1].children[1].children[1].children;

  return entries
    .filter((entry) => entry.children !== undefined && entry.children[1].firstChild !== null)
    .map((entry) => entry.children[1].firstChild.data);
};
