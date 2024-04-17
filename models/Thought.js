const { Schema, model } = require('mongoose')

const ReactionSchema = new Schema(
    {
        // Use Mongoose's ObjectId data type and Default value is set to a new ObjectId
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new Schema.Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
            
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
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

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
            
        },
        // array of nested documents created with the reaction schema
        reactions: [ReactionSchema]
    },
    {
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

    ThoughtSchema.virtual('reactionCount').get(function () {
        return this.reactions.length
    })

const Thought = model('thought', ThoughtSchema)

module.exports = Thought