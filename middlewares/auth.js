import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const auth = async (req, res, next) => {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token not found' });
    }

    // Grab the token from the header
    const token = authorization.split(" ")[1];

    try {

        const { _id } = jwt.verify(token, process.env.SECRET);

        // save the user to the request object
        req.user = await User.findById(_id).select('_id');

        next();

    } catch (error) {
        res.status(401).json({ error: error.message });
    }

}

export default auth;