import { Handler } from "../../event.type";
import { InvalidParametersError } from "../../../errors/invalid-parameters.error";

export const savingsHandler = (): Handler => async (event) => {
  const input = event.data.options?.find((option) => option.name === "buildcount")?.value;

  if (!input) {
    throw new InvalidParametersError();
  }

  const buildcount = parseInt(input, 10);
  const savingNumber = buildcount > 1000 ? 1000 : buildcount;

  const saved = Math.floor(buildcount * (1 - 0.9 ** Math.log10(savingNumber)) + 0.0000000000005);
  const percentSaved = (100 * (1 - 0.9 ** Math.log10(savingNumber))).toFixed(2);

  return { content: `Building ${buildcount} items will save ${saved} (${percentSaved}%) items` };
};
