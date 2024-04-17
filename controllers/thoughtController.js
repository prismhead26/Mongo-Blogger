const { Thought, User } = require('./models')

module.exports = {
    async createThought(res, req) {
        try {
            const thought = await Thought.create(req.body)
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findById(req.params.id)
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.id)
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $addToSet: { reactions: req.body } }, { new: true, runValidators: true })
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: req.params.reactionId } }, { new: true, runValidators: true })
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
}