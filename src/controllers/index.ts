import { AuthController } from './AuthController.js'
import { UserController } from './UserController.js'
import { ContentController, ProductController, BookController, GameController } from './ContentController.js'

const authController = new AuthController();
const userController = new UserController();
const contentController = new ContentController('content');
console.log('::: init type: '+contentController._contentType);

const bookController = new BookController('book');
console.log('::: init type: '+bookController._contentType);
const gameController = new GameController('game');
console.log('::: init type: '+gameController._contentType);
const productController = new ProductController('product');
console.log('::: init type: '+productController._contentType);

export {
	authController,
    userController,
    contentController,
    bookController,
    gameController,
    productController,
}
