import middy from "@middy/core";
import { createConfig } from "./config";
import { logger } from "../../../shared/logger";
import { errorHandler } from "../../../shared/middlewares/error-handler";
import { NotificationService } from "../../../shared/discord/notification.service";

const config = createConfig(process.env);

const notificationService = new NotificationService({
  webhookUrl: config.runsWebhookUrl,
});

const lambdaHandler = async () => {
  logger.info("Sending group content notification");
  await notificationService.notifyGroupContent();
};

export const handle = middy().use(errorHandler()).handler(lambdaHandler);
