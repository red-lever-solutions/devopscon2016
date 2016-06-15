#!/bin/bash

export PRIVATE_IP=$(ip route get 8.8.8.8 | awk '{print $NF; exit}')

export CONSUL_IP=$PRIVATE_IP 


docker-compose -p dev-devops-con -f docker-compose.dev.yml "$@" 
