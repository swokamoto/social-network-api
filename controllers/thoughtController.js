const { Thought } = require('../models');

module.exports = {

    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // get one thought by id
    async getThoughtById({ params }, res) {
        try {
            const thought = await Thought.findById(params.id);

            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // create thought
    // Example data
    // {
    //     "thoughtText": "Here's a cool thought...",
    //     "username": "teddyboi",
    //     "userId": "5edff358a0fcb779aa7b118b"
    // }
    async createThought({ body }, res) {
        try {
            const thought = await Thought.create(body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // update thought by id
    async updateThought({ params, body }, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // delete thought
    async deleteThought({ params }, res) {
        try {
            const thought = await Thought.findByIdAndDelete(params.id);

            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // add reaction to thought
    async addReaction({ params, body }, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                params.id,
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // remove reaction from thought
    async removeReaction({ params }, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                params.id,
                { $set: { reactions: [] } },
                { new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

};