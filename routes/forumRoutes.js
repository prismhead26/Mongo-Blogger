const express = require('express')
const Forum = require('../models/forum')
const router = express.Router()

router.get('/', (req, res) => {
    Forum.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('forums/forums', { title: 'All Forums', forums: result })
        })
        .catch((err) => console.log(err))
})

router.post('/', (req, res) => {
    const forum = new Forum(req.body)

    forum.save()
        .then((result) => {
            // what do we want the user to see next
            res.redirect('/forums')
        })
        .catch((err) => console.log(err))
})

router.get('/create', (req, res) => {
    res.render('forums/create', { title: 'Create a forum' })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    // console.log(id)
    Forum.findById(id)
        .then((result) => {
            res.render('forums/details', { title: 'Forum Details', forum: result } )
        })
        .catch((err) => console.log(err))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id

    Forum.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/forums' })
        })
        .catch((err) => console.log(err))
})

module.exports = router
