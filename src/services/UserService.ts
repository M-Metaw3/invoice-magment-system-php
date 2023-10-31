// UserService.ts
import { User } from '../models/User';
import { signToken, verifyToken } from '../config/jwt';
import { IService } from '../interfaces/IService';

// define the service class for the user entity
export default class UserService implements IService {
  // define a method to create a user with some data
  public async create(data: any) {
    // create a user with the data using the user model
    const user = await User.create(data);

    // return the user without password for security reasons
    return user.toJSON({ attributes: { exclude: ['password'] } });
  }

  // define a method to read users with some query
  public async read(query: any) {
    throw new Error('Method not implemented.');
  }

// define a method to update a user with an id and some data
public async update(id: any, data: any) {
    // find a user by id using the user model
    const user = await User.findByPk(id);

    // if there is no user, throw an error
    if (!user) {
      throw new Error('User not found');
    }

    // update the user with the data using the user model
    await user.update(data);

    // return the updated user without password for security reasons
    return user.toJSON({ attributes: { exclude: ['password'] } });
  }

  // define a method to delete a user with an id
  public async delete(id: any) {
    // find a user by id using the user model
    const user = await User.findByPk(id);

    // if there is no user, throw an error
    if (!user) {
      throw new Error('User not found');
    }

    // delete the user using the user model
    await user.destroy();

    // return a message indicating success
    return 'User deleted successfully';
  }

  // define a method to login a user with an email and a password
  public async login(email: string, password: string) {
    // find a user by email using the user model
    const user = await User.findOne({ where: { email } });

    // if there is no user, throw an error
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // compare the password with the hashed password using the comparePassword method of the user model
    const match = await user.comparePassword(password);

    // if the passwords do not match, throw an error
    if (!match) {
      throw new Error('Invalid email or password');
    }

    // create a payload object with the user id and email
    const payload = { id: user.id, email: user.email };

    // create a token with the payload using the signToken utility function
    const token = signToken(payload);

    // return the token and the user without password for security reasons
    return { token, user: user.toJSON({ attributes: { exclude: ['password'] } }) };
  }

  // define a method to verify a token and return the payload
  public async verify(token: string) {
    // verify the token using the verifyToken utility function
    const payload = verifyToken(token);

    // return the payload
    return payload;
  }
}
