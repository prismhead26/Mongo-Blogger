const { Thought, User } = require('../models')

module.exports = {
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body)
            await User.findOneAndUpdate(
                { _id: req.body.username },
                { $push: { thoughts: thought._id } },
                { new: true }
            )

            if (!thought) {
                res.status(404).json({ message: 'No user found with ID.' })
            }

            res.json(thought)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({})
                .populate('reactions', '-__v')
                .select('-__v')
                .sort({ createdAt: -1 })
            res.json(thoughts)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findById(req.params.id)
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id' })
            }
            res.json(thought)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id' })
            }
            res.json(thought)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findByIdAndDelete(req.params.id)

            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id' })
            }

            await User.findOneAndUpdate(
                { _id: req.body.username },
                { $pull: { thoughts: req.params.id } },
                { new: true }
            )
            res.json(thoughtData)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $addToSet: { reactions: req.body } }, { new: true, runValidators: true })
                .populate('reactions', '-__v')
                .select('-__v')

                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id' })
                }

            res.json(thought)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true, runValidators: true })

            if (!thought) {
                res.status(404).json({ message: 'Unable to delete reaction. No thought found with this id' })
            }

            res.json(thought)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
}