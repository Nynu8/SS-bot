import { awsLambdaResponse } from "../aws/response";
import { logger } from "../logger";

const createErrorResponse = (error: any) => {
  return awsLambdaResponse(error.statusCode || 500, {
    message: error.message,
  });
};

export const errorHandler = () => ({
  onError: async (handler: any) => {
    const { error } = handler;

    logger.error(error);

    Object.assign(handler, {
      response: createErrorResponse(error),
    });
  },
});
