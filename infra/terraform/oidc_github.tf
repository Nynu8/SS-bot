module "aws_oidc_github" {
  source        = "github.com/TheSoftwareHouse/terraform-modules.git//aws_oidc_github?ref=main"
  role_name     = "github-actions"
  github_org    = "Nynu8"
  github_repos  = ["SS-monitors"]
}