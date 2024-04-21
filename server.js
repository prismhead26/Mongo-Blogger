const express = require('express');
const db = require('./config/connection')
const routes = require('./routes')
require('dotenv').config()

// Define port number for routes
const PORT = process.env.PORT || 3001

// Create an instance of the express app
const app = express()

// Define middleware here
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Add routes, both API and view
app.use(routes)

// Connect to the Mongo DB
// Once the connection is open, start the server and log a message to the console
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Mongo Blogger listening on PORT ${PORT}!`)
    })
})
