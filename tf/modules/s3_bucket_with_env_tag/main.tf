resource "aws_s3_bucket" "tf-demo-bucket-2" {
  bucket              = var.name
  object_lock_enabled = true
  tags = {
    env = var.env
  }
}
