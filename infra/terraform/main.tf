provider "aws" {
  region = "eu-west-1"
}

module "s3_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "3.6.0"

  bucket_prefix = "terraform-state-"

  block_public_policy = true
  block_public_acls   = true
}
