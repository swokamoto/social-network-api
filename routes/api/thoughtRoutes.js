const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

// Set up GET all and POST at /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// Set up POST and DELETE at /api/thoughts/:thoughtId/reactions
// example data
// {
//     "reactionBody": "Here's a cool reaction...",
//     "username": "teddyboi"
// }
router.route('/:id/reactions')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;