// https://niallmckenna.com/posts/using-sequelize-orm-with-typescript

import { validationResult } from 'express-validator';
//import { Users } from '../models/Users.js';
//import { Contents } from '../models/Contents.js';
import { Users, Contents } from '../models/init-models.js';
import { Model } from 'sequelize';

import { Books, Games, Products } from '../models/ContentTypes.js';
import { CrossBindings } from '../models/CrossBindings.js';
import { applyMixins } from '../helpers/mixins.js';

import lodash from 'lodash';
const { pick, isFunction } = lodash;

// Contents.hasMany(CrossBindings, { foreignKey: 'contentID' });

export interface IBase {
    _contentType: string;
    _model: unknown;
    getContent: (req: any, res: any) => void;
    getContents: (req: any, res: any) => void;
    createContent: (req: any, res: any) => void;
    updateContent: (req: any, res: any) => void;
    deleteContent: (req: any, res: any) => void;
    getComments?: (req: any, res: any) => void;
    createComment?: (req: any, res: any) => void;
    deleteComment?: (req: any, res: any) => void;
}

type Constructor<T = {}> = new (...args: any[]) => T;

function Commentable<TBase extends Constructor>(BaseClass: TBase) {
    return class extends BaseClass {
        async getComments(req: any, res: any): Promise<void> {
            console.log('get comments...');
//            if(isFunction(this.getContents))
//                this.getContents(req, res);
            res.end();
        };
        async createComment(req: any, res: any): Promise<void> {
            console.log('create comment...');
        };
        async deleteComment(req: any, res: any): Promise<void> {
            console.log('create comment...');
        };
    };
}

export class ContentController implements IBase {

    public _contentType: string;
    public _model: unknown;

    constructor(ctype: string) {
        this._contentType = ctype;
        this.getContent = this.getContent.bind(this);
        this.getContents = this.getContents.bind(this);
        this.createContent = this.createContent.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.deleteContent = this.deleteContent.bind(this);
/*
        if(this._contentType === 'book'){
            this.getComments = this.getComments.bind(this);
            this.createComment = this.createComment.bind(this);
            this.deleteComment = this.deleteComment.bind(this);            
        }
*/
    };

    /* get all posts */
    async getContents(req: any, res: any): Promise<void> {
        console.dir(this._model);
        try {
            const contents = await Contents.findAll({ 
                where: { type: this._contentType },     //, isavail: true },
                attributes: ['id', 'title', 'type']
            });

            res.status(200).json(
                contents
        //                books.map(book => pick(book, ['id', 'title', 'name']))
            )
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    };

    /* get single post */
    async getContent(req: any, res: any): Promise<void> {
        try {
            const contents = await Contents.findAll({ 
                where: { id: req.params.id, type: this._contentType },     //, isavail: true },
        //                attributes: ['id', 'title', 'type', 'score'],
                include: Users
            });

            if (!contents) {
                res.status(404).json({
                    type: "error",
                    message: "Post doesn't exists"
                })
            } else {
                res.status(200).json(
                    contents[0]
        //                    pick(book[0], ['id', 'name', 'score'])
                );
            }
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    };

    /* create new product */
    async createContent(req: any, res: any): Promise<void> {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({
                type: 'error',
                message: errors.array()
            });
        } else {
            try {
                const { username, title, description } = req.body;
               
                const newPost = await new Contents({
                    // @ts-ignore
                    userName: username,
                    title: title,
                    description: description
                });

                const post = await newPost.save();
                res.status(201).json({
                    name: title
                });
                        
            } catch (err) {
                res.status(500).json({
                    type: "error",
                    message: "Something went wrong please try again",
                    err
                })
            }
        }
    };

    /* update product */
    async updateContent(req: any, res: any): Promise<void> {
        const existing = await Contents.findByPk(req.params.id);
        if (!existing) {
            res.status(404).json({
                type: "error",
                message: "Content doesn't exists"
            })
        } else {
            // @ts-ignore
            if(existing.userName === req.body.username){
                try {

                    const updatedPost = await Contents.update({
                        ...req.body
                    },{
                        where: { id: req.params.id }
                    });


                /*
                    const updatedPost = await Contents.findByIdAndUpdate(req.params.id, {
                                            $set: req.body
                    },
                        { new: true }
                    );
                */
                    res.status(200).json({
                        type: "success",
                        message: "Content updated successfully",
                        updatedPost
                    })
                } catch (err) {
                    res.status(500).json({
                        type: "error",
                        message: "Something went wrong please try again",
                        err
                    })
                }
            } else {
                res.status(401).json({
                    type: "error",
                    message: "You are not allowed to do this",
                })
            } 
        }
    };

    /* delete post */
    async deleteContent(req: any, res: any): Promise<void> {
        const existing = await Contents.findByPk(req.params.id);
        if (!existing) {
            res.status(200).json({
                type: "error",
                message: "Content doesn't exists"
            })
        } else {
            // @ts-ignore
            if (existing.userName === req.body.username) {
                try {
                      await Contents.destroy({ where: { id: req.params.id } })

            //                    await Contents.findOneAndDelete(req.params.id);
                    res.status(200).json({
                        type: "success",
                        message: "Post has been deleted successfully"
                    });
                } catch (err) {
                    res.status(500).json({
                        type: "error",
                        message: "Something went wrong please try again",
                        err
                    })
                }
            } else {
                res.status(401).json({
                    type: "error",
                    message: "You are not allowed to do this",
                })
            }
        }
    };
};


export class ProductController extends ContentController {
    constructor(ctype: string) {
        super('product');
        this._model = Products;
    };
};
export class BookController extends Commentable(ContentController) {
    constructor(ctype: string) {
        super('book');
        this._model = Books;
    };
};
export class GameController extends Commentable(ContentController) {
    constructor(ctype: string) {
        super('game');
        this._model = Games;
    };
};
