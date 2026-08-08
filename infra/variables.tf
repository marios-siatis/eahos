variable "aws_region" {
  description = "AWS region for the application resources."
  type        = string
  default     = "eu-west-2"
}

variable "project_name" {
  description = "Project name."
  type        = string
  default     = "eahos"
}

variable "environment" {
  description = "Environment name."
  type        = string
  default     = "prod"
}

variable "bucket_name" {
  description = "Globally unique S3 bucket name for the private frontend origin."
  type        = string
  default     = ""
}

variable "smtp_host" {
  description = "SMTP hostname for contact@eahos.com."
  type        = string
  sensitive   = true
}

variable "smtp_port" {
  description = "SMTP port."
  type        = number
  default     = 587
}

variable "smtp_secure" {
  description = "Use TLS from connection start."
  type        = bool
  default     = false
}

variable "smtp_user" {
  description = "SMTP username."
  type        = string
  sensitive   = true
}

variable "smtp_password" {
  description = "SMTP password."
  type        = string
  sensitive   = true
}

variable "mail_from" {
  description = "From address for contact messages."
  type        = string
  default     = "contact@eahos.com"
}

variable "enable_custom_domain" {
  description = "Whether CloudFront should use a custom domain."
  type        = bool
  default     = false
}

variable "custom_domain" {
  description = "Custom CloudFront hostname, for example eahos.com."
  type        = string
  default     = ""
}

variable "acm_certificate_arn" {
  description = "ACM certificate ARN in us-east-1 for the custom domain."
  type        = string
  default     = ""
}

variable "route53_zone_id" {
  description = "Optional Route 53 hosted zone ID for eahos.com. Leave empty if DNS is hosted elsewhere."
  type        = string
  default     = ""
}
