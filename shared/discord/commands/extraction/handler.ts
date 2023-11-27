import { Handler } from "../../event.type";
import { InvalidParametersError } from "../../../errors/invalid-parameters.error";

export const extractionHandler = (): Handler => async (event) => {
  const noExtractors = parseInt(event.data.options?.find((option) => option.name === "no_extractors")?.value || "", 10);
  const extractionRate = parseFloat(
    event.data.options?.find((option) => option.name === "extraction_rate")?.value || "",
  );
  const exeLevel = parseInt(event.data.options?.find((option) => option.name === "exe_level")?.value || "", 10);

  if (!noExtractors || !extractionRate || !exeLevel) {
    throw new InvalidParametersError();
  }

  const rate = extractionRate * (1 + 0.22 * exeLevel);
  return {
    content: [
      "```",
      `${noExtractors} extractors,`,
      `with ${(extractionRate * noExtractors).toFixed(2)} (${extractionRate} each) extraction rate`,
      `and Extraction Expert Level of ${exeLevel}`,
      `will result in extraction rate of ${(rate * noExtractors).toFixed(2)} per day`,
      `or ${((extractionRate * noExtractors) / (24 * 60)).toFixed(2)} per minute`,
    ].join("\n"),
  };
};
