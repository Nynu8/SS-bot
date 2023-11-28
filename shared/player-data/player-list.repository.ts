import { BatchWriteCommand, DynamoDBDocumentClient, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Logger } from "../logger";

interface PlayerListRepositoryDependencies {
  client: DynamoDBDocumentClient;
  logger: Logger;
}

export class PlayerListRepository {
  private tableName = "PlayerData";

  constructor(private dependencies: PlayerListRepositoryDependencies) {}

  async savePlayers(newPlayers: string[], removedPlayers: string[], team: string) {
    const requestItems = [
      ...newPlayers.map((player) => ({
        PutRequest: {
          Item: {
            pk: this.createTeamKey(team),
            sk: this.createPlayerKey(player),
          },
        },
      })),
      ...removedPlayers.map((player) => ({
        DeleteRequest: {
          Key: {
            pk: this.createTeamKey(team),
            sk: this.createPlayerKey(player),
          },
        },
      })),
    ];

    const chunkedRequestItems = [];
    for (let i = 0; i < requestItems.length; i += 25) {
      chunkedRequestItems.push(requestItems.slice(i, i + 25));
    }

    await Promise.all(
      chunkedRequestItems.map((chunk) =>
        this.dependencies.client.send(
          new BatchWriteCommand({
            RequestItems: {
              [this.tableName]: chunk,
            },
          }),
        ),
      ),
    );
  }

  async getPlayersFromTeam(team: string): Promise<string[]> {
    const res = await this.dependencies.client.send(
      new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: "pk = :pk",
        ExpressionAttributeValues: {
          ":pk": this.createTeamKey(team),
        },
      }),
    );

    return res.Items?.map((item) => item.sk.split("#")[1]) || [];
  }

  async getTeamList() {
    const res = await this.dependencies.client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: {
          pk: this.createTeamKey(""),
          sk: "list#",
        },
      }),
    );

    return res.Item?.list;
  }

  private createPlayerKey = (player: string) => {
    return `player#${player}`;
  };

  private createTeamKey = (team: string) => {
    return `team#${team}`;
  };
}
