#http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html

resource "aws_iam_role" "s3_read" {
    name = "S3_Read"
    assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Principal": {"Service": "ec2.amazonaws.com"},
    "Action": "sts:AssumeRole"
  }
}
EOF
}

resource "aws_iam_role_policy" "s3_read" {
    name = "S3_Read"
    role = "${aws_iam_role.s3_read.id}"
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:List*",
	"s3:GetBucketLocation"
      ],
      "Resource": "arn:aws:s3:::*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:Get*"
      ],
      "Resource": "arn:aws:s3:::redlever-devops/*"
    }
  ]
}
EOF
}

resource "aws_iam_instance_profile" "s3_read" {
    name = "S3_read"
    roles = ["S3_Read"]
}
