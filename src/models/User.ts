// User.ts
const { Model, DataTypes, Hooks } =require( 'sequelize');
import { sequelize } from '../config/db';
import { IUser } from '../interfaces/IUser';
import { hashPassword, comparePassword } from '../utils/bcrypt';

// define the user model class
export class User extends Model implements IUser {
  // define the properties
  public name!: string;
  public email!: string;
  public password!: string;

  // define a method to compare passwords
  public async comparePassword(password: string) {
    return await comparePassword(password, this.password);
  }
}

// define the table name and columns
User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'users',
    sequelize // pass the sequelize instance
  }
);

// define a hook to hash the password before saving
User.addHook('beforeSave', async (user:any) => {
  if (user.changed('password')) {
    user.password = await hashPassword(user.password);
  }
});
