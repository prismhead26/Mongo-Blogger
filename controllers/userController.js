const { User, Thought } = require('./models')

module.exports = {

    async createUser(res, req) {
        try {
            const user = await User.create(req.body)
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getAllUser(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getUserById(req, res) {
        try {
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
            res.status(500).json(err)
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            res.json(user)

            if(!user) {
                res.status(404).json({ message: 'No user found with this id' })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.json(user)

            if(!user) {
                res.status(404).json({ message: 'No user found with this id' })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async addFriend (req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $addToSet: { friends: req.params.friendId } }, { new: true, runValidators: true })
            res.json(user)

            if(!user) {
                res.status(404).json({ message: 'No user found with this id' })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteFriend (req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $pull: { friends: req.params.friendId } }, { new: true, runValidators: true })
            res.json(user)

            if(!user) {
                res.status(404).json({ message: 'No user found with this id' })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    },
}