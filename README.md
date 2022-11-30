# Attentive Ticketmaster Proxy
 
Proxy server that receives GET requests at `/ticketmaster/:apiKey`, transforms the query params into data object properties and reroutes the request to Attentive Custom Events API server at `https://api.attentivemobile.com/v1/events/custom` as an authenticated POST request.

## Installation

Requires Node.js. To install dependencies type:

```shell
npm install
```

## Run it

Uses `nodemon` to automatically reboot server as you make/save changes. To run the server type:

```shell
npm run dev
```