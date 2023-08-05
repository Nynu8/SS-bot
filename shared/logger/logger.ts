import * as winston from "winston";
import { Logger } from "./logger.types";

const logFormat = winston.format.printf((log) => {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    severity: log.level,
    message: log.message,
    meta: log.meta,
  });
});

export const logger: Logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(winston.format.errors(), winston.format.splat(), logFormat),
  transports: [new winston.transports.Console()],
});
