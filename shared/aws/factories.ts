import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const createDynamoDbDocumentClient = (): DynamoDBDocumentClient => {
  const dynamoDbClient = new DynamoDBClient({});
  const documentClient = DynamoDBDocumentClient.from(dynamoDbClient);

  return documentClient;
};
