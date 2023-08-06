resource "aws_sqs_queue" "update_roster" {
  name = "update-roster"
}

resource "aws_ssm_parameter" "update_roster_queue_url" {
  name        = "update-roster-queue-url"
  description = "update-roster queue URL"
  type        = "String"
  value       = aws_sqs_queue.update_roster.url
}

resource "aws_ssm_parameter" "update_roster_queue_arn" {
  name        = "update-roster-queue-arn"
  description = "update-roster queue ARN"
  type        = "String"
  value       = aws_sqs_queue.update_roster.arn
}
