const { User, Thought } = require('../models');

module.exports = {

    // get all users
    async getAllUsers(req, res) {
        try {
            const thoughts = await User.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // get one user by id
    async getUserById({ params }, res) {
        try {
            const thought = await User.findById(params.id);

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

    // create new user
    async createUser ({ body }, res) {
        try {
            const user = await User.create(body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // update user by id
    async updateUser({ params, body }, res) {
        try {
            const user = await User.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // delete user
    async deleteUser({ params }, res) {
        try {
            const user = await User.findByIdAndDelete(params.id);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // add friend to user by id
    async addFriend({ params }, res) {
        try {
            const user = await User.findByIdAndUpdate(
                { _id: params.id },
                { $push: { friends: params.friendId } },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // remove friend from user by id
    async removeFriend({ params }, res) {
        try {
            const user = await User.findByIdAndUpdate(
                { _id: params.id },
                { $pull: { friends: params.friendId } },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

};