import { Sequelize } from 'sequelize';
import { Singleton } from '../helpers/singleton.js'
import { initModels } from "../models/init-models.js";

@Singleton
export default class dbInit {

	private static _instance: Sequelize;

	public static init(DBString: string) {
		// @ts-ignore

		dbInit._instance = new Sequelize(DBString, {
			logging: console.log
		});
		dbInit._instance.authenticate().then(() => {
			console.log('Connection has been established and authenticated.');

			const { Contents, Users, CrossBindings /*, Books, Games, Articles, Products, Comments, Reviews */} = initModels(dbInit._instance);

//			console.log(Users.findByPk(1));

		}).catch((error) => {
			console.error('::: Unable to connect to the database...');
			console.error('::: @@@'+error.message);
		});
	}
}
