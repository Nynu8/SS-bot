import { WebhookClient } from "discord.js";
import { teamUpdateMessage } from "./messages/team-update-message";
import { groupContentMessage } from "./messages/group-content-message";
import { PlayerInfo } from "../ss-website/types";
import { unassignedMessage } from "./messages/unassigned-message";

interface NotificationServiceDependencies {
  webhookUrl: string;
}

export class NotificationService {
  webhookClient: WebhookClient;

  constructor(private dependencies: NotificationServiceDependencies) {
    this.webhookClient = new WebhookClient({
      url: this.dependencies.webhookUrl,
    });
  }

  async notifyTeamMonitor(team: string, joined: string[], left: string[]) {
    await this.webhookClient.send({
      content: teamUpdateMessage(team, joined, left),
    });
  }

  async notifyFailedTeamUpdate(team: string) {
    await this.webhookClient.send({
      content: `Failed to update list for team **${team}**`,
    });
  }

  async notifyGroupContent() {
    await this.webhookClient.send({
      content: groupContentMessage(),
    });
  }

  async notifyUnassigned(playerInfo: PlayerInfo[]) {
    await this.webhookClient.send({
      content: unassignedMessage(playerInfo),
    });
  }
}
