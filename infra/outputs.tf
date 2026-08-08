output "cloudfront_url" {
  value = "https://${aws_cloudfront_distribution.eahos.domain_name}"
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.eahos.domain_name
}

output "frontend_bucket_name" {
  value = aws_s3_bucket.frontend.bucket
}

output "contact_api_url" {
  value = "${aws_apigatewayv2_api.contact.api_endpoint}/api/contact"
}

output "lambda_function_name" {
  value = aws_lambda_function.contact.function_name
}

output "custom_domain" {
  value = var.enable_custom_domain ? var.custom_domain : null
}
