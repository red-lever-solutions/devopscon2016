#!/bin/bash

echo "Installing the webapp ..."

mkdir -p /opt/webapp
cp -r /tmp/bootstrap/webapp/* /opt/webapp/
cd /opt/webapp
./start.sh
