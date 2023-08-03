resource "aws_dynamodb_table" "player_data" {
  name         = "PlayerData"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "pk"
  range_key    = "sk"

  attribute {
    name = "pk"
    type = "S"
  }

  attribute {
    name = "sk"
    type = "S"
  }

}

resource "aws_ssm_parameter" "player_data_arn" {
  name        = "player-data-ddb-arn"
  description = "DDB Table ARN for storing playernames"
  type        = "String"
  value       = aws_dynamodb_table.player_data.arn
}
