resource "aws_s3_bucket" "tf-demo-bucket-2" {
  bucket = "tf-demo-bucket-2" # Ensure unique bucket name

  tags = {
    Env = var.env
  }
}
