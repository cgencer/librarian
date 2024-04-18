import express from 'express';
import lodash from 'lodash';
const { isFunction } = lodash;

import { authController, userController,  
		 bookController, gameController, productController } from '../controllers/index.js';

let routes = express.Router();
function subControllers(type: string, ctrl: any) {
	routes.get(`/${type}/`,  		ctrl.getContents);
	routes.get(`/${type}/:id`,  	ctrl.getContent);
	if(isFunction(ctrl.getComments))
		routes.get(`/${type}/:id/comments/`,  	ctrl.getComments);
	routes.post(`/${type}/`, 		ctrl.createContent);
	routes.put(`/${type}/`, 		ctrl.updateContent);
	routes.delete(`/${type}/:id`,	ctrl.deleteContent);
}
subControllers('books', bookController);
subControllers('games', gameController);
subControllers('products', productController);
//subControllers('comments', commentController);
export { routes as contentRoutes };
