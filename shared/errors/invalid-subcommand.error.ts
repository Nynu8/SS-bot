import { AppError } from "./app.error";

export class InvalidSubcommandError extends AppError {
  constructor(subcommand: string) {
    super(`Invalid subcommand ${subcommand}`);
  }
}
