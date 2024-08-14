const { Schema, Types } = require('mongoose');

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
};

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'You need to provide a reaction!',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'You need to provide a username!'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => formatDate(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

module.exports = reactionSchema;