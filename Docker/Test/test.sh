#!/bin/sh

echo "User Background"

npm install forever -g

echo "Run forever"

forever start /usr/src/app/client_user.js

echo "Run tests"
# npm run test **/tests/
npm run test
