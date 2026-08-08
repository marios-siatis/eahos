# EAHOS AWS Infrastructure

Terraform provisions the complete low-cost EAHOS website stack:

- Private S3 bucket for React static assets
- CloudFront CDN
- CloudFront Origin Access Control
- API Gateway HTTP API
- AWS Lambda contact function
- IAM execution role
- SMTP environment variables
- Optional Route 53 record
- Optional CloudFront custom domain

## AWS architecture

```text
                     Internet
                        |
                        v
                 CloudFront CDN
                   /         \
                  /           \
                 v             v
          Private S3       API Gateway
          React app             |
                                v
                              Lambda
                                |
                                v
                              SMTP
                                |
                                v
                       contact@eahos.com
```

## Why this architecture

It avoids EC2, ECS, RDS and other always-on infrastructure.

For a small company website, the site is mostly static. S3 + CloudFront handles that cheaply. The contact endpoint only runs when someone submits the form, so Lambda is a better fit than an always-on server.

The API is routed through the same CloudFront distribution at `/api/contact`, so the browser does not need a separate API hostname.

## Prerequisites

Install:

- AWS CLI
- Terraform >= 1.7
- Node.js 22+

Configure AWS:

```bash
aws configure
```

Confirm:

```bash
aws sts get-caller-identity
```

## Deploy infrastructure

```bash
cd infra
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars`.

Do not commit this file because it contains the SMTP password.

Then:

```bash
terraform init
terraform fmt -recursive
terraform validate
terraform plan
terraform apply
```

Get the outputs:

```bash
terraform output
```

The important output is:

```text
cloudfront_url
```

## Deploy the React site

From the repository root:

```bash
npm install
npm run build
```

Then upload `dist/` to the bucket:

```bash
aws s3 sync dist/ s3://$(cd infra && terraform output -raw frontend_bucket_name) --delete
```

CloudFront will serve the files through the CDN.

Invalidate the cache after a deployment:

```bash
aws cloudfront create-invalidation \
  --distribution-id "$(aws cloudfront list-distributions \
    --query "DistributionList.Items[?DomainName=='$(cd infra && terraform output -raw cloudfront_domain_name)'].Id | [0]" \
    --output text)" \
  --paths "/*"
```

For CI/CD, use the GitHub Actions workflow in `.github/workflows/deploy.yml`.

## Local development

Run the frontend:

```bash
npm install
npm run dev
```

The Vite proxy expects the contact API at:

```text
http://localhost:3001
```

For a local Lambda API you can use AWS SAM, LocalStack, or deploy the infrastructure first and point the frontend at the deployed API during testing.

## Contact email

The Lambda sends mail to:

```text
contact@eahos.com
```

It uses your existing mailbox's SMTP service.

You need:

```text
SMTP_HOST
SMTP_PORT
SMTP_SECURE
SMTP_USER
SMTP_PASS
MAIL_FROM
```

Do not put these credentials into React.

## Custom domain

CloudFront requires an ACM certificate in **us-east-1** for a custom domain.

The Terraform project accepts:

```text
enable_custom_domain
custom_domain
acm_certificate_arn
route53_zone_id
```

If your DNS is in Route 53, provide `route53_zone_id` and Terraform can create the apex A alias.

If your DNS is at GoDaddy or another registrar, leave `route53_zone_id` empty. Create/validate the ACM certificate in `us-east-1` and then point your DNS record at the CloudFront hostname.

Recommended initial sequence:

1. Deploy without the custom domain.
2. Verify the CloudFront URL.
3. Verify the contact form.
4. Create an ACM certificate in us-east-1.
5. Validate it through DNS.
6. Set `enable_custom_domain = true`.
7. Apply Terraform.
8. Point your DNS to CloudFront.

## Terraform state

For production, do not keep Terraform state only on your laptop.

Create an encrypted S3 backend with restricted access before the infrastructure becomes important.

Do not commit:

```text
*.tfstate
terraform.tfvars
```

## Security notes

The S3 bucket is private. CloudFront accesses it using Origin Access Control.

The Lambda has only the standard CloudWatch Logs execution policy. It does not need S3, DynamoDB, or other AWS permissions.

The SMTP password is injected into Lambda environment variables through Terraform. Treat Terraform state as sensitive because infrastructure state can contain resource configuration.

For a public contact form, add bot/spam protection and rate limiting before heavy public traffic.
