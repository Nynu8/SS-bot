terraform {
  backend "s3" {
    bucket  = "terraform-state-20230804212028694000000001"
    key     = "ss-bot/terraform.tfstate"
    region  = "eu-west-1"
    encrypt = true
  }
}
