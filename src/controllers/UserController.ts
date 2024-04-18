import bcrypt from "bcrypt";
import lodash from 'lodash';
const { pick } = lodash;
import { z } from 'zod';

import { Users } from '../models/Users.js';
import { Contents } from '../models/Contents.js';
import { Books } from '../models/ContentTypes.js';

import { CrossBindings } from '../models/CrossBindings.js';

interface Base {
    getUser: (req: any, res: any) => void;
    updateUser: (req: any, res: any) => void;
    deleteUser: (req: any, res: any) => void;
}

/* get single user */
export class UserController implements Base {

    async getUser(req: any, res: any): Promise<void> {

        try {
            const user = await Users.scope('includeBooks').findAll({
                where: {
                    id: req.params.id,
//                    "Contents.CrossBindings.type": 'present'
                },
/*
                include: [{
                  model: Books, 
                  attributes: [['id', 'cid'], 'title'],
                }],
*/
                attributes: ['id', 'userName', 'name', 'firstName', 'lastName'],
            });

            if (!user) {
                res.status(404).json({
                    type: "error",
                    message: "User doesn't exists"
                })
            } else {
//                const { password, ...data } = user;

                res.status(200).json({
                    user,
//                    ...pick(user, ['id', 'name']),
/*
                    books: {
                        past: pastTitles.map(title => {return ({'name': title.dataValues.name});}),
                        present: currTitles.map(title => {return ({'name': title.dataValues.name});})
                    }
*/
                })
            }
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    };

    async getUsers(req: any, res: any): Promise<void> {

        try {
            const users = await Users.findAll();
            if (!users) {
                res.status(404).json({
                    type: "error",
                    message: "User doesn't exists"
                })
            } else {
                const filteredUsers = users.map(user => pick(user, ['id', 'name']));

                res.status(200).json(filteredUsers)
            }
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong, please try again",
                err
            })
        }
    };

    async borrowBook(req: any, res: any): Promise<void> {
        try {
            const theBook = await Contents.findByPk(req.params.bookid);
            const updatedUser = await Contents.update({ 
//                isavail: false
            },{ 
                where: { id: req.params.bookId, type: 'book'}//, isavail: true }
            });
            res.status(204).send();

        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "The selected book is not available at the moment, please try next time.",
                err
            })
        }
    };

    async returnBook(req: any, res: any): Promise<void> {
        try {
            const updatedUser = await Contents.update({
//                isavail: true
            },{
                where: { id: req.params.bookId, type: 'book'} // isavail: false }
            });
            res.status(204).send();

        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "The selected book is not available at the moment, please try next time.",
                err
            })
        }
    };

    /* update user */
    async updateUser (req: any, res: any): Promise<void> {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }

        try {
            const updatedUser = await Users.update({
                ...req.body
            },{
                where: { id: req.params.id }
            });

/*
            const updatedUser = await Users.findByIdAndUpdate(req.params.id, { $set: req.body },{ new: true });
*/
            res.status(200).json({
                type: "success",
                message: "User updated successfully",
                updatedUser
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong, please try again",
                err
            })
        }
    };

    /* delete user */
    async deleteUser (req: any, res: any): Promise<void> {
        try {
              await Users.destroy({ where: { id: req.params.id } })
//            await Users.findByIdAndDelete(req.params.id)

            res.status(200).json({
                type: "success",
                message: "User has been deleted successfully"
            });
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        } 
    };
};