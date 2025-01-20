import Post from "../models/PostModel.js";
import {v4 as uuidV4, validate as uuidValidate} from "uuid";
import User from "../models/UserModel.js";


/************************* GET ALL POST *****************************/
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: "desc" });

        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/************************* GET ALL POST *****************************/
const getUserPosts = async (req, res) => {

    // grab the authenticated user from the request object
    const user = await User.findById(req.user._id);


    try {
        const userPosts = await Post.find({ user: user._id }).sort({ createdAt: "desc" });

        res.status(200).json({ userPosts, email: user.email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



/************************* CREATE NEW POST *****************************/
const addPost = async (req, res) => {

    const id = uuidV4();
    const { title, body } = req.body;


    if(!title || !body) {
        return res.status(400).json({ error: 'Please enter all fields' });
    }

    // grab the authenticated user from the request object
    const user = await User.findById(req.user._id);

    try {
        const post = await Post.create({ user: user._id, _id: id, title, body });

        res.status(200).json({ success: 'POST created.', post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};


/************************* UPDATE POST *****************************/
const updatePost = async (req, res) => {

    const { id } = req.params;
    const { title, body } = req.body;

    // Check if title and body are provided
    if(!title || !body) {
        return res.status(400).json({ error: 'Please enter all fields' });
    }

    // Check if ID is valid
    if(!uuidValidate(id)) {
        return res.status(400).json({ error: 'Incorrect ID' });
    }

    // Check if post exists
    const post = await Post.findById(id);
    if(!post) {
        return res.status(404).json({ error: 'POST not found' });
    }

    // Check the user owns the post
    const user = await User.findById(req.user._id);
    if(post.user !== user._id) {
        return res.status(401).json({ error: 'You are not authorized to update this post' });
    }


    try {
        await post.updateOne({ title, body });

        res.status(200).json({ success: 'POST update.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};


/************************* DELETE POST *****************************/
const deletePost = async (req, res) => {

    const { id } = req.params;

    if(!uuidValidate(id)) {
        return res.status(400).json({ error: 'Incorrect ID' });
    }

    const post = await Post.findById(id);
    if(!post) {
        return res.status(404).json({ error: 'POST not found' });
    }

    // Check the user owns the post
    const user = await User.findById(req.user._id);
    if(post.user !== user._id) {
        return res.status(401).json({ error: 'You are not authorized to update this post' });
    }

    try {
        await Post.deleteOne();

        res.status(200).json({ success: 'POST deleted.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

export { getPosts, getUserPosts, addPost, updatePost, deletePost };