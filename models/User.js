const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

// Create a new instance of the Schema constructor to shape each document
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
            // Must match a valid email address
            // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
            match: [/^(?<username>[\w\.-]+)@(?<domain>\w+)\.(?<extension>\w{3})(?<loc>\.\w{2,8})?$/, 'Please enter a valid email address']
        },
        thoughts: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        // set toJson so that virtuals and getters are included in the response
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    })

    // Create a virtual called friendCount that retrieves the length of the user's friend array field on query
    UserSchema.virtual('friendCount').get(function () {
        return this.friends?.length
    })

// Create a new model using the UserSchema
const User = model('User', UserSchema)

// Export the User model
module.exports = User