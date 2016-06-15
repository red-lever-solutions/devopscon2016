provider "aws" {
  region = "eu-west-1"
}

resource "aws_s3_bucket" "provision" {
    bucket = "redlever-devops"
    acl = "private"

    tags {
        Name = "Deploy files"
    }
}
