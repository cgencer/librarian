import { validationResult } from 'express-validator';
import bcrypt from "bcrypt";
import { encode_reg_token } from '../helpers/tokens.js';
import { z } from 'zod';
import { Users } from '../models/Users.js';


interface Base {
    createUser: (req: any, res: any) => void;
    loginUser: (req: any, res: any) => void;
}

/* create new user */
export class AuthController implements Base {

    // public static async build(): Promise<MyClass> {

    public async createUser(req: any, res: any): Promise<void> {

        const newUserSchema = z.object({
            username: z.string(),
            email: z.string().email(),
            password: z.string()
        });

        const result = newUserSchema.safeParse(req.body);
        if (!result.success) {
            res.status(500).json({
                type: 'error',
                message: result.error
            });
        } else {
            try {
                const { username, email, password } = result.data; 
                const newUser = new Users({
                    userName: username,
                    name: username,
                    email: email,
                    password: password
                });

                const user = await newUser.save();
                res.status(201).json({
                    name: user.name,
                });

            } catch (err) {
                res.status(500).json({
                    type: 'error',
                    message: err
                });
            }    
        }
    };

    /* user login */
    public async loginUser(req: any, res: any): Promise<void> {
        try {
            const { username } = req.body;

            /* check user is exist with our system */
            const user = await Users.findOne({ where: { userName: username } });
            if (!user) {
                return res.status(401).json({
                    type: 'error',
                    message: 'No account is associated with the given username'
                });
            }

            /* compare password */
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    type: 'error',
                    message: 'Invalid credentials'
                });
            }

            /* create access token */
            const accessToken = encode_reg_token(user.id);

            /* avoid send password in response */
            const { password, ...data } = user;
            res.status(200).json({
                type: 'sucesss',
                data,
                accessToken
            });
        } catch (err) {
            res.status(500).json({
                type: 'error',
                message: err
            });
        }
    };
};
