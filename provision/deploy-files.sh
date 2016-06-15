#!/bin/bash

if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
    echo "Set environment variables AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY first"
    exit 1
fi

# Create tar balls
find . -maxdepth 1 -mindepth 1 -type d -exec sh -c 'tar cvzf $(basename "$1").tar.gz $(basename "$1")' sh {}  \;

# Delete old content
aws s3 rm s3://redlever-devops --recursive

# Copy tar balls to S3
find . -maxdepth 1 -mindepth 1 -type f -name "*.tar.gz" -exec aws s3 cp {} s3://redlever-devops --acl public-read \;

# Delete local tar balls
find . -maxdepth 1 -mindepth 1 -type f -name "*.tar.gz" -exec rm {} \;
