#!/bin/bash

mkdir -p /opt/loadbalancer
cp -r /tmp/bootstrap/loadbalancer/* /opt/loadbalancer/
cd /opt/loadbalancer
./start.sh
