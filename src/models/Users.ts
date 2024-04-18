import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UsersAttributes {
  id: number;
  uuid?: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  password: string;
  birthday?: Date;
  wallet?: string;
  social?: object;

  createdAt: Date;
  updatedAt: Date;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "id" | "firstName" | "lastName" | "name" | "birthday" | "wallet" | "createdAt" | "updatedAt" | "social" | "uuid";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id!: number;
  uuid?: string;
  userName!: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email!: string;
  password!: string;
  birthday?: Date;
  wallet?: string;
  social?: object;

  createdAt!: Date;
  updatedAt!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    return Users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: "1923-10-29"
    },
    wallet: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    social: {
      type: DataTypes.JSON,
      allowNull: true
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Users',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
