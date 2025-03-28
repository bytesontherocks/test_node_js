# Testing Nodejs

Following https://socket.io/docs/v4/tutorial/api-overview + chatgpt insides

## Basic checks

'''
node -v
npm -v
'''

## Extensions

'''
./install_nodejs_extensions.sh
'''

## web framework for Node.js v4

'''
npm install express@4
npm fund
'''

## To run the app

'''
node index.js
'''

## Client side

'''
npm install socket.io
'''

## What's going on in the chat app.

We open a socket and listen on a port (e.g. 3000) when a client connects (e.g. web browser) the server serves html code. In this html code there the server enables ways to interact and perform actions from the client side. For example send a message to the server, log the message and the client side and present it in the web browser in a certain way.
