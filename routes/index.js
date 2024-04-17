const router = require('express').Router()
const apiRoutes = require('./routes/api')

router.use('/api', apiRoutes)

router.use((req, req) => res.send('Wrong route!'))

module.exports = router