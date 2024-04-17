const { connect, connection } = require('mongoose')
// require dotenv
require('dotenv').config()

connect( process.env.MongoDB_URI || 'mongodb://localhost:27017/mongoBloggerDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = connection