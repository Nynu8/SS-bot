import { AppError } from "./app.error";

export class MissingCommandError extends AppError {
  constructor() {
    super("Missing command");
  }
}
