# Configure the AWS provider
provider "aws" {
  region = "ap-southeast-1"
}

# Random ID to ensure unique bucket name
resource "random_id" "bucket_id" {
  byte_length = 4
}


# Create an S3 bucket
resource "aws_s3_bucket" "tf-demo-bucket-1" {
  bucket              = "tf-demo-bucket-1-${random_id.bucket_id.hex}"
  object_lock_enabled = true
}

module "s3_bucket" {
  source = "./modules/s3_bucket_with_env_tag"
  env    = "dev"
  name   = "tf-demo-bucket-2-${random_id.bucket_id.hex}" # Ensure unique bucket name
}

