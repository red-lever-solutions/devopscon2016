#!/bin/bash

while true
do
inotifywait -r -e modify,delete,create,move /opt/www/app-src
cp -r /opt/www/app-src/* /opt/www/app/.
sed -e "s@http://localhost:3000@$BACKEND@" /opt/www/tmp-script/script.js >  /opt/www/app/public/script.js 
done

