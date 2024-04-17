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

// Matches with "/api/thoughts/:id/reactions/:reactionId"
router
    .route('/:id/reactions/:reactionId')
    .post(addReaction)
    .delete(deleteReaction);

module.exports = router;