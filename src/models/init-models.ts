import type { Sequelize } from "sequelize";

import { Contents as _Contents } from "./Contents.js";
import type { ContentsAttributes, ContentsCreationAttributes } from "./Contents.js";
import { CrossBindings as _CrossBindings } from "./CrossBindings.js";
import type { CrossBindingsAttributes, CrossBindingsCreationAttributes } from "./CrossBindings.js";
import { Users as _Users } from "./Users.js";
import type { UsersAttributes, UsersCreationAttributes } from "./Users.js";
import {  Books as _Books, 
          Games as _Games, 
          Products as _Products } from "./ContentTypes.js";

export {
  _Contents as Contents,
  _CrossBindings as CrossBindings,
  _Users as Users,
  _Books as Books,
  _Games as Games, 
  _Products as Products, 
};

export type {
  ContentsAttributes,
  ContentsCreationAttributes,
  CrossBindingsAttributes,
  CrossBindingsCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Contents = _Contents.initModel(sequelize);
  const CrossBindings = _CrossBindings.initModel(sequelize);
  const Users = _Users.initModel(sequelize);

  const Books = _Books.initModel(sequelize);
  const Games = _Games.initModel(sequelize);
  const Products = _Products.initModel(sequelize);

  Books.belongsToMany(Users, {
    through: CrossBindings,
    foreignKey: 'contentID',
    otherKey: 'userID'
  });
  Users.hasMany(Books);

  Contents.belongsToMany(Users, {
    through: 'CrossBindings',
    foreignKey: 'contentID',
    otherKey: 'userID'
  });
  Users.belongsToMany(Contents, {
    through: 'CrossBindings',
    foreignKey: 'userID',
    otherKey: 'contentID'
  });

  Users.addScope('includeBooks', {
    include: [{
      model: Books, 
      attributes: [['id', 'cid'], 'title'],

//          [sequelize.col('Books.CrossBindings.type'), 'ctype']
//        [Sequelize.fn('COUNT', Sequelize.col('options_votes.id')), 'votes'],
    }]
  });
  Users.addScope('includeContents', {
    include: [{
        model: Contents, 
        attributes: [['id', 'cid'], 'title']
    }],
  });

  return {
    Contents: Contents,
    CrossBindings: CrossBindings,
    Users: Users,
    Books: Books,
    Games: Games,
    Products: Products,
  };
}
