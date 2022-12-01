require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const axios = require('axios')
const PORT = process.env.PORT || 4000

// Create Express Server
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Logging
app.use(morgan('dev'))

// Add CORS HTTP headers
app.use(cors())

// Function to log messages in console
function logger (req) {
  // console.log('REQ:', req)
  // console.log("=====")
  console.log('REQ.PROTOCOL:', req.protocol)
  console.log('REQ.HOSTNAME:', req.hostname)
  console.log('REQ.METHOD:', req.method)
  console.log('REQ.URL:', req.url)
  console.log('REQ.ORIGINALURL:', req.originalUrl) // '/admin/new?sort=desc'
  console.log('REQ.PATH:', req.path) // '/new'
  console.log('REQ.PARAMS:', req.params) // '/???'
  console.log('REQ.QUERY:', req.query)
  // console.log('REQ.COOKIE:', req.cookie)
  // console.log('REQ.COOKIES:', req.cookies)
  console.log('REQ.HEADERS:', req.headers)
  console.log('REQ.HEADERS.COOKIE:', req.headers.cookie)
  console.log('REQ.HEADERS.AUTHORIZATION:', req.headers['authorization'])
  console.log('AUTHORIZATION:', req.get('authorization'))
  console.log('CONTENT-TYPE:', req.get('content-type'))
  console.log('REQ.BODY', req.body)
}

// TICKETMASTER GET REQUEST
app.get('/ticketmaster', (req, res, next) => {
  logger(req)

  const url = `https://api.attentivemobile.com/v1/events/custom`
  console.log('URL:', url)
  const method = 'POST'

  // Query String Params
  const query = req.query

  // Create apiKey from query object then delete it from query object
  const apiKey = query.apiKey
  delete query.apiKey

  // Create auth header from apiKey
  const headers = {}
  headers['authorization'] = `Bearer ${apiKey}`
  headers['content-type'] = 'application/json'

  // Create type prop from query object then delete it from query object
  const type = query.type
  delete query.type

  // Create custom properties object from remaining query string params (eventId, amount, etc.)
  const properties = query

  // Create User object from cookie data
  const user = {}
  user.phone = req.headers.cookie.replace('phone=', '')

  // Create POST body data object
  const data = {}
  // Set type (required), user (required) and custom properties (optional)
  data.type = type
  data.user = user
  data.properties = properties
  console.log('DATA:', data)

  // Send POST request to Attentive Custom Events API endpoint
  axios({
    url,
    method,
    headers,
    data
  })
    .then(function (response) {
      // handle success
      console.log('SUCCESS')
      console.log('RESPONSE.DATA:', response.data)
      res.json(response.data)
    })
    .catch(function (error) {
      // handle error
      // console.log('ERROR:', error)
      // console.log('ERROR.RESPONSE:', error.response)
      console.log('CATCH')
      console.log('ERROR:', error.response.status, error.response.statusText)
      // res.status(error.response.status).json({ error: error.response.statusText })
      res.status(error.response.status).send(error.response.statusText)
    })
    .finally(function () {
      // always executed
      console.log('FINALLY')
      // res.sendStatus(200)
    })
})

// ACK CATCHALL
// Catchall to acknowledge requests that don't match the paths above
app.use(/.*/, (req, res, next) => {
  logger(req)
  res.sendStatus(200)
})

// Start the Proxy Server
app.listen(PORT, () => {
  console.log(`Starting Proxy Server on port: ${PORT}`)
})
