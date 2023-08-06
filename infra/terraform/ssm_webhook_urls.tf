resource "aws_ssm_parameter" "team_monitor_webhook_url" {
  name        = "team-monitor-webhook-url"
  description = "Webhook URL for team monitor discord channel"
  type        = "SecureString"
  value       = "a"

  lifecycle {
    ignore_changes = [value]
  }
}

resource "aws_ssm_parameter" "roster_monitoring_webhook_url" {
  name        = "discord-monitoring-webhook-url"
  description = "Webhook URL for roster monitor discord channel"
  type        = "SecureString"
  value       = "a"

  lifecycle {
    ignore_changes = [value]
  }
}

resource "aws_ssm_parameter" "runs_webhook_url" {
  name        = "runs-channel-webhook-url"
  description = "Webhook URL for runs discord channel"
  type        = "SecureString"
  value       = "a"

  lifecycle {
    ignore_changes = [value]
  }
}
