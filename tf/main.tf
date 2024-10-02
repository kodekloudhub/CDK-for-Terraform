# Configure the AWS provider
provider "aws" {
  region = "ap-southeast-1"
}

# Create an S3 bucket
resource "aws_s3_bucket" "tf-demo-bucket-1" {
  bucket = "tf-demo-bucket-1"

  object_lock_enabled = true
}

module "s3_bucket" {
  source = "./modules/s3_bucket_with_env_tag"
  env    = "dev"
}



