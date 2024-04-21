const { connect, connection } = require('mongoose')
// require dotenv
require('dotenv').config()

// Wrap Mongoose around local or remote database to MongoDB
connect( process.env.MongoDB_URI || 'mongodb://localhost:27017/mongoBloggerDB', {
})

// Export the connection to be used in other files
module.exports = connection