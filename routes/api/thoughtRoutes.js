const router = require('express').Router();
const {
    createThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController')

// Matches with "/api/thoughts"
router.route('/').get(getAllThoughts).post(createThought);

// Matches with "/api/thoughts/:id"
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// Matches with "/api/thoughts/:id/reactions"
router
    .route('/:thoughtId/reactions')
    .post(addReaction)

// Matches with "/api/thoughts/:thoughtId/reactions/:reactionId"
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

module.exports = router;