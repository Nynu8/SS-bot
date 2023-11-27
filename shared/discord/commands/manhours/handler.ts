import { Duration } from "luxon";
import { Handler } from "../../event.type";
import { InvalidParametersError } from "../../../errors/invalid-parameters.error";

export const manhoursHandler = (): Handler => async (event) => {
  const manhours = parseInt(event.data.options?.find((option) => option.name === "manhours")?.value || "", 10);
  const workforce = parseInt(event.data.options?.find((option) => option.name === "workforce")?.value || "", 10);
  const constructionSpeed = parseInt(
    event.data.options?.find((option) => option.name === "construction_speed")?.value || "",
    10,
  );
  const buildcount = parseInt(event.data.options?.find((option) => option.name === "buildcount")?.value || "", 10);

  if (!manhours || !workforce || !constructionSpeed || !buildcount) {
    throw new InvalidParametersError();
  }

  const result =
    (((manhours * 10) / workforce) * 0.9 ** Math.log10(Math.min(buildcount, 1000)) * buildcount) /
    (1 + constructionSpeed / 100);

  const timespan = Duration.fromObject({ seconds: result });

  return {
    content: [
      "```",
      `${buildcount} items,`,
      `${manhours} manhour(s) each,`,
      `with ${workforce} worker(s)`,
      `and ${constructionSpeed}% construction speed bonus`,
      `will take ${timespan.toFormat("d'd' h'h' m'm'")}`,
      "```",
    ].join("\n"),
  };
};
