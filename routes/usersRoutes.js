import express from 'express';
import { registerUser, loginUser } from '../controllers/usersControllers.js';


const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the user.
 *         password:
 *           type: string
 *           description: Password of the user.
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token returned after successful login.
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Register a new user
 *     description: Create a new user by providing email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request, invalid data.
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Login an existing user
 *     description: Login by providing email and password to receive a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login successful, returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Bad request, invalid data.
 *       401:
 *         description: Unauthorized, incorrect credentials.
 */
router.post('/login', loginUser);

export { router as usersRoutes };