// Product.ts
const { Model, DataTypes } =require( 'sequelize');
import { sequelize } from '../config/db';
import { IProduct } from '../interfaces/IProduct';

// define the product model class
export class Product extends Model implements IProduct {
  // define the properties
  public name!: string;
  public price!: number;
  public description?: string;
  public image?: string;
}

// define the table name and columns
Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: 'products',
    sequelize // pass the sequelize instance
  }
);
