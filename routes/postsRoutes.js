import express from 'express';
import { addPost, getPosts, updatePost, deletePost, getUserPosts } from '../controllers/postsControllers.js';
import auth from '../middlewares/auth.js';


const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: ID of the user who created the post.
 *         _id:
 *           type: string
 *           description: Unique identifier for the post.
 *         title:
 *           type: string
 *           description: Title of the post.
 *         body:
 *           type: string
 *           description: Body content of the post.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp.
 *
 * /api/posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Retrieve all posts
 *     description: Fetch all posts from the database.
 *     responses:
 *       200:
 *         description: A list of posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 */
router.get('/', getPosts);

/**
 * @swagger
 * /api/posts/user:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Retrieve posts for the authenticated user
 *     description: Fetch posts associated with the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of posts by the authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userPosts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 email:
 *                   type: string
 *                   description: Email of the user.
 */
router.get('/user', auth, getUserPosts);


/**
 * @swagger
 * /api/posts:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Create a new post
 *     description: Add a new post for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post.
 *               body:
 *                 type: string
 *                 description: Body content of the post.
 *     responses:
 *       201:
 *         description: Post created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post('/', auth, addPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     tags:
 *       - Posts
 *     summary: Update an existing post
 *     description: Update the details of an existing post by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title of the post.
 *               body:
 *                 type: string
 *                 description: Updated body content of the post.
 *     responses:
 *       200:
 *         description: Post updated successfully.
 */
router.put('/:id', auth, updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Delete a post
 *     description: Remove an existing post by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to delete.
 *     responses:
 *       200:
 *         description: Post deleted successfully.
 */
router.delete('/:id', auth, deletePost);


export {
    router as postsRoutes
}