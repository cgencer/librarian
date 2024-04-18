import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CrossBindingsAttributes {
  id: number;
  userID: number;
  contentID: number;
  type: string;
  extra?: object;
  score?: number;
}

export type CrossBindingsPk = "id";
export type CrossBindingsId = CrossBindings[CrossBindingsPk];
export type CrossBindingsOptionalAttributes = "id" | "extra" | "score";
export type CrossBindingsCreationAttributes = Optional<CrossBindingsAttributes, CrossBindingsOptionalAttributes>;

export class CrossBindings extends Model<CrossBindingsAttributes, CrossBindingsCreationAttributes> implements CrossBindingsAttributes {
  id!: number;
  userID!: number;
  contentID!: number;
  type!: string;
  extra?: object;
  score?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof CrossBindings {
    return CrossBindings.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contentID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    extra: {
      type: DataTypes.JSON,
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'CrossBindings',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "CrossBindings_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
