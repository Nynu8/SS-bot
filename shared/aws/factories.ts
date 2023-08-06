import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { SQSClient } from "@aws-sdk/client-sqs";

export const createDynamoDbDocumentClient = (): DynamoDBDocumentClient => {
  const dynamoDbClient = new DynamoDBClient({});
  const documentClient = DynamoDBDocumentClient.from(dynamoDbClient);

  return documentClient;
};

export const createSqsClient = (): SQSClient => {
  const sqsClient = new SQSClient({});

  return sqsClient;
};
