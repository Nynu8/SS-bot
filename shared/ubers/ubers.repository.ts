import { DynamoDBDocumentClient, PutCommand, QueryCommand, TransactWriteCommand } from "@aws-sdk/lib-dynamodb";
import { Logger } from "../logger";
import { Uber } from "./types";
import { UbersList } from "../discord/commands/ubers/ubers-list";

interface UbersRepositoryDependencies {
  client: DynamoDBDocumentClient;
  logger: Logger;
}

export class UbersRepository {
  private tableName = "PlayerData";

  constructor(private dependencies: UbersRepositoryDependencies) {}

  async getUbers(): Promise<Uber[]> {
    const res = await this.dependencies.client.send(
      new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: "pk = :pk",
        ExpressionAttributeValues: {
          ":pk": this.createUbersPrimaryKey(),
        },
      }),
    );

    return (
      res.Items?.map((item) => ({
        name: item.sk.split("#")[1],
        galaxy: item.galaxy,
      })) || []
    );
  }

  async updateGalaxy(name: string, galaxy: string) {
    await this.dependencies.client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: {
          pk: this.createUbersPrimaryKey(),
          sk: this.createUbersSortKey(name),
          galaxy,
        },
      }),
    );
  }

  async clearGalaxies() {
    const requestItems = UbersList.map((name) => ({
      Update: {
        TableName: this.tableName,
        Key: {
          pk: this.createUbersPrimaryKey(),
          sk: this.createUbersSortKey(name),
        },
        UpdateExpression: "set galaxy = :galaxy",
        ExpressionAttributeValues: {
          ":galaxy": "Unknown",
        },
      },
    }));

    await this.dependencies.client.send(
      new TransactWriteCommand({
        TransactItems: requestItems,
      }),
    );
  }

  private createUbersPrimaryKey() {
    return "ubers#";
  }

  private createUbersSortKey(name: string) {
    return `ubers#${name}`;
  }
}
