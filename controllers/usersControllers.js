import User from '../models/UserModel.js';
import {v4 as uuidV4, validate as uuidValidate} from "uuid";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';


/************************* Create JWT *****************************/
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '10d' });
}


/************************* Register USER *****************************/
const registerUser = async (req, res) => {

    const _id = uuidV4();

    const { email, password } = req.body;

    // check the fields are not empty
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // check if the user already exists
    const exist = await User.findOne({ email });

    if (exist) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    // hash the password
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);

    try {
        // create a new user
        const user = await User.create({
            _id,
            email,
            password: hashed
        });

        // create a token
        const token = createToken(user._id);

        res.status(200).json({ email, token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};


/************************* Login USER *****************************/
const loginUser = async (req, res) => {

    const { email, password } = req.body;

    // check the fields are not empty
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // check if the user already exists
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Incorrect email' });
    }

    // check password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    try {
        // create a token
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    

};

export { registerUser, loginUser };