resource "aws_ssm_parameter" "team_monitor_webhook_url" {
  name        = "team-monitor-webhook-url"
  description = "Webhook URL for team monitor discord channel"
  type        = "SecureString"
  value       = "a"

  lifecycle {
    ignore_changes = [value]
  }
}
