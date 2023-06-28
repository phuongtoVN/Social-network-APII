const reactionSchema = require('./reaction');
const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema (
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
          type: String,
          required: true
        },
        reactions: [reactionSchema]
    }, 
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property called 'reactionCount'
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
  
// Format the 'createdAt' field on query using a getter method
thoughtSchema.set('toJSON', { getters: true });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;