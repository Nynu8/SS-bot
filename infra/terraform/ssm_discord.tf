resource "aws_ssm_parameter" "discord_bot_token" {
  name        = "discord-bot-token"
  description = "Bot Token for bot"
  type        = "SecureString"
  value       = "a"

  lifecycle {
    ignore_changes = [value]
  }
}

resource "aws_ssm_parameter" "discord_client_id" {
  name        = "discord-client-id"
  description = "Client ID for bot"
  type        = "SecureString"
  value       = "a"

  lifecycle {
    ignore_changes = [value]
  }
}

resource "aws_ssm_parameter" "discord_public_key" {
  name        = "discord-public-key"
  description = "Public key for bot"
  type        = "SecureString"
  value       = "a"

  lifecycle {
    ignore_changes = [value]
  }
}
