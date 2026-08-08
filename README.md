# EAHOS — AWS Deployment

React/Vite company website with a low-cost AWS serverless backend.

## Stack

- React + Vite
- S3 private origin
- CloudFront
- API Gateway HTTP API
- AWS Lambda
- Nodemailer / existing SMTP mailbox
- Terraform
- GitHub Actions

## Architecture

```text
eahos.com
   |
   v
CloudFront
   |
   +----> S3 (private React assets)
   |
   +----> /api/contact -> API Gateway -> Lambda -> SMTP -> contact@eahos.com
```

## Quick start

```bash
npm install
npm run build

cd infra
cp terraform.tfvars.example terraform.tfvars
# edit SMTP credentials
terraform init
terraform fmt -recursive
terraform validate
terraform plan
terraform apply
```

Then deploy the built site:

```bash
cd ..
aws s3 sync dist/ s3://$(cd infra && terraform output -raw frontend_bucket_name) --delete
```

Get the website:

```bash
cd infra
terraform output -raw cloudfront_url
```

## GitHub Actions

The workflow can deploy both infrastructure and frontend.

Before enabling it, configure the following GitHub repository secrets:

```text
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
SMTP_HOST
SMTP_PORT
SMTP_SECURE
SMTP_USER
SMTP_PASSWORD
```

For production, prefer GitHub Actions OIDC with an AWS IAM role rather than long-lived AWS access keys.

## Email

The contact form sends to:

```text
contact@eahos.com
```

The SMTP provider is intentionally not hard-coded. Use the SMTP server for whichever provider hosts the mailbox.

## Cost philosophy

The site intentionally avoids always-on servers.

- S3 stores the frontend.
- CloudFront delivers the frontend.
- API Gateway receives contact submissions.
- Lambda runs only when the contact API is called.
- No EC2.
- No ECS.
- No RDS.
- No Kubernetes.

Actual AWS billing depends on traffic, data transfer and account-specific pricing/free-tier eligibility.

## Important

Do not commit:

```text
infra/terraform.tfvars
*.tfstate
```

The Terraform variables file contains SMTP credentials.
