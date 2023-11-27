import { AppError } from "./app.error";

export class InvalidParametersError extends AppError {
  constructor() {
    super("Invalid or no parameters provided");
  }
}
