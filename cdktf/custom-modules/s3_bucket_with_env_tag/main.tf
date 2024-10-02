# Random ID to ensure unique bucket name
resource "random_id" "bucket_id" {
  byte_length = 4
}


resource "aws_s3_bucket" "tf-demo-bucket-2" {
  bucket              = "tf-demo-bucket-2-${random_id.bucket_id.hex}" # Ensure unique bucket name
  object_lock_enabled = true
  tags = {
    Env = var.env
  }
}
