#!/bin/bash

while true
do
inotifywait -r  /opt/www/tmp-script
echo $BACKEND
grep -rl "devMode" /opt/www/tmp-script | xargs sed -i s@devMode\ \=\ false@devMode\ \=\ true@g
sed -e "s@http://localhost:3000@$BACKEND@" /opt/www/tmp-script/script.js >  /opt/www/app/public/script.js 
done


