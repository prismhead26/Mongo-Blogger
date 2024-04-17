const router = require('express').Router()
const thoughtRoutes = require('./routes/thoughts')
const userRoutes = require('./routes/users')

router.use('/api/thoughts', thoughtRoutes)
router.use('/api/users', userRoutes)

module.exports = router