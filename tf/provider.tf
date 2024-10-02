# Configure the local state storage
terraform {
  backend "local" {
    path = "terraform.tfstate"
  }
}
