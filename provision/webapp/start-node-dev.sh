#!/bin/bash

cp -r /opt/www/app-src/* /opt/www/app/.

cd /opt/www/app

npm run build-js

cd ..

./watch-app-src.sh &

./watch-tmp-script.sh &

cd app

npm run watch-js &

nodemon app
