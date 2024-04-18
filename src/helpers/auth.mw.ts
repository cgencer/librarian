import jwt from 'jsonwebtoken';
//const config: Config = require('../config/app.json');
import { config } from '../config/config.js';

export const authVerifier = (req: any, res: any, next: any) => {

    const authHeader = req.headers.token;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, config.jwt_secret, (err: any, user: any) => {
            if (err) res.status(401).json("Invalid token");
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json("Not authenticated");
    }
}

/* check if the current user */
export const accessVerifier = (req: any, res: any, next: any) => {
    authVerifier(req, res, () => {
        if (req.user.id === req.params.id) {
            next();
        } else {
            res.status(403).json("Not allowed to perform this task");
        }
    })
}
