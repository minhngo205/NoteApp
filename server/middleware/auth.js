import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config()
const secret = process.env.SCRET_KEY

const auth = async (req, res, next) => {
    const token = req.body.token || req.headers.authorization;
    if(!token) return res.status(403).send("A token is required for authentication");

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
};
  
export default auth;