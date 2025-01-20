import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    user: {
        type: String,
        required: true,
        ref: 'User',
    },

    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

export default Post;