const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // must match a valid email address with mongoose validation
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'is invalid']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    })

    // Create a virtual called friendCount that retrieves the length of the user's friend array field on query
    UserSchema.virtual('friendCount').get(function () {
        return this.friends.length
    })

const User = model('user', UserSchema)

module.exports = User