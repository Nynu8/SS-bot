import { WebhookClient } from "discord.js";
import { createTeamNotification } from "./create-team-notification";

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
      content: createTeamNotification(team, joined, left),
    });
  }

  async notifyFailedTeamUpdate(team: string) {
    await this.webhookClient.send({
      content: `Failed to update list for team **${team}**`,
    });
  }
}
