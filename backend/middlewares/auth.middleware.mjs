import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../utils/constants.mjs';

export const verifyToken = (req, res, next)=>{
    const token = req.header('Authorization')
    if(!token) return res.status(401).send({ error: 'Access denied' })
    try {
        const decode = jwt.verify(token, TOKEN_SECRET)
        req.user = decode
        next();
    } catch (error) {
        return res.status(401).send({error: 'Invalide token'})
    }
}