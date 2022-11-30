# Attentive Ticketmaster Proxy
 
Proxy server that receives GET requests at `/ticketmaster/:apiKey`, transforms the query params into data object properties and reroutes the request to Attentive Custom Events API server at `https://api.attentivemobile.com/v1/events/custom` as an authenticated POST request.