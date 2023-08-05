import winston from "winston";

export type Logger = Pick<winston.Logger, "log" | "error" | "warn" | "info" | "debug">;
