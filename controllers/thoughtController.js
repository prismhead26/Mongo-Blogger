const { Thought, User } = require('../models')

module.exports = {
    // Create a new thought
    async createThought(req, res) {
        try {
            const thought = (await Thought.create(req.body))
            // Update the user's thoughts array with the new thought's id
            await User.findOneAndUpdate(
                { _id: req.body.userId },
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
    // Get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({})
                .populate('reactions', '-__v')
                // populate only the username field from the User model into the Thought model
                .populate( { path: 'userId', model: 'User', select: { "username": 1 } } )
                // remove the __v field from the response
                .select('-__v')
                // sort the response by createdAt in descending order
                .sort({ createdAt: -1 })

            if(!thoughts) {
                res.status(404).json({ message: 'No thoughts found' })
            }

            res.json(thoughts)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    // Get a single thought by id
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
    // Update a thought by id
    async updateThought(req, res) {
        try {
            // Update the thought with the request body
            const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id' })
            }
            res.json(thought)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    // Delete a thought by id
    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findByIdAndDelete(req.params.id)

            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id' })
            }
            // Update the user's thoughts array to remove the deleted thought's id
            await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $pull: { thoughts: req.params.id } },
                { new: true }
            )
            res.json(thoughtData)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    // Add a reaction to a thought by id
    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $addToSet: { reactions: req.body } }, { new: true, runValidators: true })
                // populate the thought's reactions array with the new reaction's id
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
    // Delete a reaction from a thought by id
    async deleteReaction(req, res) {
        try {
            // Update the thought's reactions array to remove the deleted reaction's id
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