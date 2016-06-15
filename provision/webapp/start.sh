#!/bin/bash

cd /opt/webapp

export PRIVATE_IP="$(curl -s http://169.254.169.254/latest/meta-data/local-ipv4)"

docker-compose -f docker-compose.prod.yml up -d
