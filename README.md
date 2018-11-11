# Lab 16 - Bearer Authentication
**Author**: Wyatt Pefley
**Version**: 1.0.0

***CANNOT START MY SERVER, GETTING THE FOLLOWING ERROR:***

MongooseError: The `uri` parameter to `openUri()` must be a string, got "undefined". Make sure the first parameter to `mongoose.connect()` or `mongoose.createConnection()` is a string.

***THIS ALSO PREVENTS MY TEST SUITE FROM RUNNING PROPERLY, WILL FIX ASAP***
# Build Status
## Overview
This lab project involved using basic and bearer authentication to create an account and login

## Testing
To start the database for testing, enter ```npm run dbon``` in your terminal. Then to start the test, enter: ```npm run test```. To turn the database off, enter: ```npm run dboff```.

#### Account Model
A successful status code of 200 is sent as the response if an account and token are created with the data sent in the POST request. If there is an error, a 400 status code is sent.

There is also a test for logging in with a username and password using basic auth. If successful, a 200 status code is sent.

