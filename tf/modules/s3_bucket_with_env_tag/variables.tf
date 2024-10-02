variable "env" {
  description = "Environment tag for the bucket"
  type        = string
  validation {
    condition     = var.env == "dev" || var.env == "prod"
    error_message = "The env variable must be either 'dev' or 'prod'."
  }
}

variable "name" {
  description = "The name of the bucket"
  type        = string
}
