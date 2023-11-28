import { Handler } from "../../event.type";

export const scanHandler = (): Handler => async (_event) => {
  return { content: "ok" };
};
