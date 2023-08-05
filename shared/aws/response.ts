export const awsLambdaResponse = (statusCode: number, body?: any) => ({
  statusCode,
  body: body ? JSON.stringify(body) : body,
});
