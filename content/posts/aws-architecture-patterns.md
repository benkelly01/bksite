---
title: "AWS Architecture Patterns: Building Resilient Cloud Infrastructure"
date: 2026-01-03
description: "A deep-dive into proven AWS architecture patterns for building scalable, resilient, and cost-effective cloud infrastructure"
tags: ["aws", "cloud", "architecture", "devops"]
draft: false
---

After years of building and consulting on AWS infrastructure, I've seen the same architectural patterns emerge time and again. These aren't theoretical exercises—they're battle-tested approaches that solve real problems at scale.

## The Three-Tier Architecture: Still Relevant in 2026

Despite the rise of serverless and containerized workloads, the three-tier architecture remains foundational. Here's why it still matters and how to do it right.

### Architecture Overview

A modern three-tier setup separates concerns into:
- **Presentation tier** (Application Load Balancer + CloudFront)
- **Application tier** (ECS/EKS or EC2 Auto Scaling Groups)
- **Data tier** (RDS Multi-AZ + ElastiCache + S3)

The key is isolating failure domains. When your database struggles, it shouldn't take down your entire application—and proper tiering prevents that.

### Infrastructure as Code: The Right Way

Here's a Terraform example that implements this pattern with proper networking isolation:

```hcl
# VPC with proper CIDR planning
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "production-vpc"
    Environment = "production"
  }
}

# Public subnets for load balancers
resource "aws_subnet" "public" {
  count                   = 3
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.${count.index}.0/24"
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "public-subnet-${count.index + 1}"
    Tier = "public"
  }
}

# Private subnets for application tier
resource "aws_subnet" "private_app" {
  count             = 3
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 10}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "private-app-subnet-${count.index + 1}"
    Tier = "application"
  }
}

# Private subnets for data tier
resource "aws_subnet" "private_data" {
  count             = 3
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 20}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "private-data-subnet-${count.index + 1}"
    Tier = "data"
  }
}
```

### Security Groups: Defense in Depth

Security groups should follow the principle of least privilege. Here's the pattern I use:

```hcl
# ALB security group - only 443 from internet
resource "aws_security_group" "alb" {
  name_prefix = "alb-sg-"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTPS from internet"
  }

  egress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.app.id]
    description     = "To application tier"
  }
}

# Application tier - only from ALB
resource "aws_security_group" "app" {
  name_prefix = "app-sg-"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
    description     = "From ALB only"
  }

  egress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.rds.id]
    description     = "To RDS only"
  }
}

# RDS security group - only from app tier
resource "aws_security_group" "rds" {
  name_prefix = "rds-sg-"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.app.id]
    description     = "From app tier only"
  }
}
```

This creates a security chain: Internet → ALB → App → Database. Each tier can only communicate with its immediate neighbors.

## The Event-Driven Pattern: When to Use It

Event-driven architectures excel when you need to decouple services or handle variable workloads. Here's a real-world example.

### Use Case: Processing User Uploads

Traditional approach: User uploads file → API server processes it → Response sent

**Problems:**
- API servers are blocked during processing
- Timeout issues for large files
- Difficult to retry failed jobs
- Can't scale processing independently

Event-driven approach: User uploads → S3 → EventBridge → Lambda/ECS Task → DynamoDB

Here's the Terraform for this pattern:

```hcl
# S3 bucket with event notifications
resource "aws_s3_bucket" "uploads" {
  bucket = "user-uploads-prod"
}

resource "aws_s3_bucket_notification" "upload_events" {
  bucket = aws_s3_bucket.uploads.id

  eventbridge = true  # Enable EventBridge integration
}

# EventBridge rule to trigger processing
resource "aws_cloudwatch_event_rule" "process_upload" {
  name        = "process-user-upload"
  description = "Trigger processing when files are uploaded"

  event_pattern = jsonencode({
    source      = ["aws.s3"]
    detail-type = ["Object Created"]
    detail = {
      bucket = {
        name = [aws_s3_bucket.uploads.id]
      }
    }
  })
}

# Lambda function for processing
resource "aws_lambda_function" "processor" {
  filename      = "processor.zip"
  function_name = "upload-processor"
  role          = aws_iam_role.lambda_exec.arn
  handler       = "index.handler"
  runtime       = "python3.11"

  environment {
    variables = {
      RESULT_TABLE = aws_dynamodb_table.results.name
    }
  }
}

# Connect EventBridge to Lambda
resource "aws_cloudwatch_event_target" "lambda" {
  rule      = aws_cloudwatch_event_rule.process_upload.name
  target_id = "ProcessorLambda"
  arn       = aws_lambda_function.processor.arn
}
```

### When NOT to Use Event-Driven

Event-driven architectures add complexity. Avoid them when:
- You need synchronous responses
- The workflow is simple and linear
- You're building an MVP (start simple, add complexity when needed)
- Debugging is critical (distributed tracing becomes essential)

## The Multi-Region Pattern: Active-Active Done Right

Multi-region deployments are expensive and complex. Only do it if you actually need it.

### When You Need Multi-Region

1. **Regulatory requirements** (data residency laws)
2. **SLA requirements** (99.99%+ uptime)
3. **Latency requirements** (global user base)

### When You Don't

1. **"It would be cool"** - No. It's expensive.
2. **Disaster recovery** - Active-passive is cheaper
3. **Perceived reliability** - Fix your architecture first

### Implementation Strategy

If you do need multi-region, here's the pattern:

```hcl
# Route 53 with health checks and latency routing
resource "aws_route53_record" "app" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "app.example.com"
  type    = "A"

  set_identifier = "us-east-1"

  alias {
    name                   = aws_lb.us_east_1.dns_name
    zone_id                = aws_lb.us_east_1.zone_id
    evaluate_target_health = true
  }

  latency_routing_policy {
    region = "us-east-1"
  }
}

resource "aws_route53_record" "app_eu" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "app.example.com"
  type    = "A"

  set_identifier = "eu-west-1"

  alias {
    name                   = aws_lb.eu_west_1.dns_name
    zone_id                = aws_lb.eu_west_1.zone_id
    evaluate_target_health = true
  }

  latency_routing_policy {
    region = "eu-west-1"
  }
}

# DynamoDB global tables for cross-region replication
resource "aws_dynamodb_table" "sessions" {
  name             = "user-sessions"
  billing_mode     = "PAY_PER_REQUEST"
  hash_key         = "session_id"
  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  replica {
    region_name = "eu-west-1"
  }

  replica {
    region_name = "ap-southeast-2"
  }
}
```

## Cost Optimization: The Pattern No One Talks About

Architecture isn't just about functionality—it's about economics. Here are the patterns that actually reduce your AWS bill.

### 1. Right-Size Everything

Use AWS Compute Optimizer recommendations, but verify them:

```python
import boto3

client = boto3.client('compute-optimizer')

# Get EC2 recommendations
response = client.get_ec2_instance_recommendations(
    maxResults=100
)

for recommendation in response['instanceRecommendations']:
    current_type = recommendation['currentInstanceType']
    recommended = recommendation['recommendationOptions'][0]['instanceType']
    savings = recommendation['recommendationOptions'][0]['estimatedMonthlySavings']

    if savings['value'] > 50:  # Only act on $50+ monthly savings
        print(f"Instance {recommendation['instanceArn']}")
        print(f"  Current: {current_type}")
        print(f"  Recommended: {recommended}")
        print(f"  Monthly savings: ${savings['value']:.2f}")
```

### 2. Use S3 Intelligent-Tiering

For data you access unpredictably, Intelligent-Tiering beats manual lifecycle policies:

```hcl
resource "aws_s3_bucket" "data" {
  bucket = "analytics-data-prod"
}

resource "aws_s3_bucket_intelligent_tiering_configuration" "entire_bucket" {
  bucket = aws_s3_bucket.data.id
  name   = "EntireBucket"

  tiering {
    access_tier = "DEEP_ARCHIVE_ACCESS"
    days        = 180
  }

  tiering {
    access_tier = "ARCHIVE_ACCESS"
    days        = 90
  }
}
```

### 3. Spot Instances for Fault-Tolerant Workloads

ECS with Spot can reduce compute costs by 70%:

```hcl
resource "aws_ecs_capacity_provider" "spot" {
  name = "spot-capacity-provider"

  auto_scaling_group_provider {
    auto_scaling_group_arn         = aws_autoscaling_group.spot.arn
    managed_termination_protection = "ENABLED"

    managed_scaling {
      maximum_scaling_step_size = 10
      minimum_scaling_step_size = 1
      status                    = "ENABLED"
      target_capacity           = 100
    }
  }
}

resource "aws_launch_template" "spot" {
  name_prefix   = "ecs-spot-"
  image_id      = data.aws_ami.ecs.id
  instance_type = "c5.large"

  instance_market_options {
    market_type = "spot"

    spot_options {
      max_price = "0.05"  # Set your maximum price
    }
  }
}
```

## Lessons Learned

**Start simple.** The best architecture is the one that solves your actual problem, not the one that impresses at conferences.

**Optimize for change.** Requirements will shift. Build with loose coupling and clear interfaces so you can adapt without rebuilding everything.

**Measure everything.** You can't optimize what you don't measure. Use CloudWatch, X-Ray, and custom metrics to understand your system's behavior.

**Cost is a feature.** An architecture that bankrupts the company isn't successful, no matter how technically elegant.

The patterns above work because they're based on constraints: network boundaries, failure domains, cost structures, and human limitations. Master the fundamentals, and you can build anything.

---

*What architecture patterns have worked for you? Find me on [X](https://x.com/BenKelly86) or [LinkedIn](https://linkedin.com/in/ben-kelly-4b2b6a61) to discuss.*
