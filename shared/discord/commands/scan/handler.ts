import { Handler } from "../../event.type";

export const scanHandler = (): Handler => async (event) => {
  console.log(event.data);

  return { content: "ok" };
};
