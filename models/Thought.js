const { Schema, model } = require('mongoose')
// Define mongoose
const mongoose = require('mongoose')
// Use moment for date formatting
const moment = require('moment')

// Create a new instance of the Schema constructor to shape each document
const ReactionSchema = new Schema(
    // Add individual properties and their data types
    {
        // Use Mongoose's ObjectId data type and Default value is set to a new ObjectId
        reactionId: {
            type: mongoose.Types.ObjectId,
            default: new mongoose.Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        // Create a reference to the User model
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
            
        },
        // Built in method to get current date and time
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        // set toJson so that virtuals and getters are included in the response
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

    // use a getter method to format the timestamp on query
    ReactionSchema.virtual('formattedDate').get(function () {
        return moment(this.createdAt).format('MMMM Do YYYY, h:mm:ss a')
    })

// Create a new instance of the Schema constructor to shape each document
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        // Built in method to get current date and time
        createdAt: {
            type: Date,
            default: Date.now
        },
        // create username property to auto populate with the user's name based on the user's id
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
            
        },
        // array of nested documents created with the reaction schema
        reactions: [ReactionSchema]
    },
    {
        // set toJson so that virtuals and getters are included in the response
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    })

    // use a getter method to format the timestamp on query
    ThoughtSchema.virtual('formattedDate').get(function () {
        return moment(this.createdAt).format('MMMM Do YYYY, h:mm:ss a')
    })

    // use a getter method to get the length of the reactions array
    ThoughtSchema.virtual('reactionCount').get(function () {
        return this.reactions.length
    })

// Create a new model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema)

// Export the Thought model with the reaction schema integrated
module.exports = Thought