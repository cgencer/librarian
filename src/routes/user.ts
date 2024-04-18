import express from 'express';
import { authController, userController } from '../controllers/index.js';

// to use access-control, enable this and add 'accessVerifier' to the routes middleware-list
//import { accessVerifier } from '../helpers/auth.mw.js';

const routes = express.Router();

routes.get('/', userController.getUsers);
routes.get('/:id', userController.getUser);
routes.post('/:id/borrow/:bookId', userController.borrowBook);
routes.post('/:id/return/:bookId', userController.returnBook);
routes.put('/:id', userController.updateUser);
routes.delete('/:id', userController.deleteUser);

export { routes as userRoutes };
