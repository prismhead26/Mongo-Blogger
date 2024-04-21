const { User, Thought } = require('../models')

module.exports = {
    // Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body)
            res.json(user)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    // Get all users
    async getAllUser(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    // Get a single user by id
    async getUserById(req, res) {
        try {
            // Find the user by id and populate the user's thoughts and friends arrays
            const user = await User.findById(req.params.id)
                .populate('thoughts')
                .select('-__v')
                .populate('friends')
                .select('-__v')
            res.json(user)
        
            if(!user) {
                res.status(404).json({ message: 'No user found with this id' })
            }

        } catch (err) {
            return res.status(500).json(err)
        }
    },
    // Update a user by id
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            res.json(user)

            if(!user) {
                res.status(404).json({ message: 'No user found with this id' })
            }
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    // Delete a user by id
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.json(user)

            if(!user) {
                res.status(404).json({ message: 'No user found with this id' })
            }
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    // Add friend to a user by id
    async addFriend (req, res) {
        try {
            // Update the user's friends array with the new friend's id
            const user = await User.findByIdAndUpdate(req.params.id, { $addToSet: { friends: req.params.friendId } }, { new: true, runValidators: true })
            res.json(user)

            if(!user) {
                res.status(404).json({ message: 'No user found with this id' })
            }
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    // Delete a friend from a user by id
    async deleteFriend (req, res) {
        try {
            // Update the user's friends array to remove the deleted friend's id
            const user = await User.findByIdAndUpdate(req.params.id, { $pull: { friends: req.params.friendId } }, { new: true, runValidators: true })
            res.json(user)

            if(!user) {
                res.status(404).json({ message: 'No user found with this id' })
            }
        } catch (err) {
            return res.status(500).json(err)
        }
    },
}