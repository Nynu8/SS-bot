resource "aws_ssm_parameter" "roster_google_credentials" {
  name        = "roster-google-credentials"
  description = "Google Credentials to access SRX roster"
  type        = "SecureString"
  value       = "a"

  lifecycle {
    ignore_changes = [value]
  }
}

resource "aws_ssm_parameter" "roster_spreadsheet_id" {
  name        = "roster-spreadsheet-id"
  description = "Spreadsheet ID of SRX roster"
  type        = "SecureString"
  value       = "a"

  lifecycle {
    ignore_changes = [value]
  }
}
