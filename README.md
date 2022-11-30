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

## Ticketmaster params

Many companies use Ticketmaster to sell tickets to events and want to track the source of a ticket referral for attribution. Ticketmaster does not allow you to add third-party javascript tags but it does allow you to perform *pixel tracking* by including an `img` tag that performs an unauthenticated GET request with custom parameters attached. These params can be used to extract custom event data and properties and rerouted to the Attentive API as an authenticated POST request.

## GET &rarr; POST

For example, an img source URL could be constructed like this:

`https://example.com/<API_KEY>?type=ticket%20purchase&phone=%2B12065551234&eventId=abc123&eventName=Jets%20vs%20Seahawks&ticketsPurchased=4`

The GET request could be parsed and transformed into an Attentive Custom Events POST request like this:

```shell
curl -i -X POST \
  https://api.attentivemobile.com/v1/events/custom \
  -H 'Authorization: Bearer <API_KEY>' \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "Ticket Purchase",
    "user": {
      "phone": "+12065551234",
    }
    "properties": {
      "eventId": "abc123",
      "eventName": "Jets vs. Seahawks",
      "ticketsPurchased": "4"
    }
  }'
```




## Flow

The flow would look something like this with a proxy server receiving the requests from Ticketmaster, transforming the request and rerouting it to the Attentive API.

![Ticket Master Flow](ticketmaster-flow.png)