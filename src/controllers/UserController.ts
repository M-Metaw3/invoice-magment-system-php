// UserController.ts
import { Request, Response ,NextFunction} from 'express';
import  UserService  from '../services/UserService';
import { validateData, userSchema } from '../utils/joi';
import { IController } from '../interfaces/IController';

// define the controller class for the user entity
export class UserController implements IController {
  // define a private property for the user service instance
  private userService: UserService;

  // define the constructor that takes a user service instance as a parameter
  constructor(userService: UserService) {
    this.userService = userService;
  }

  // define a method to get all users (not implemented)
  public async get(req: Request, res: Response) {
    throw new Error('Method not implemented.');
  }

  // define a method to create a user with some data
  public async post(req: Request, res: Response) {
    try {
      // get the body from the request
      const body = req.body;

      // validate the body with the user schema using the joi utility
      const { error, value } = validateData(body, userSchema);

      // if there is an error, throw it
      if (error) {
        throw error;
      }

      // create a user with the value object using the user service
      const user = await this.userService.create(value);

      // send a response with status 201 and user
      res.status(201).send(user);
    } catch (err) {
      // pass the error to the next middleware or controller
      next(err);
    }
  }

  // define a method to update a user with an id and some data
  public async put(req: Request, res: Response) {
    try {
      // get the params and body from the request
      const params = req.params;
      const body = req.body;

      // validate the body with the user schema using the joi utility
      const { error, value } = validateData(body, userSchema);

      // if there is an error, throw it
      if (error) {
        throw error;
      }

      // update a user with the params.id and value object using the user service
      const user = await this.userService.update(params.id, value);

      // send a response with status 200 and user
      res.status(200).send(user);
    } catch (err) {
      // pass the error to the next middleware or controller
      next(err);
    }
  }

  // define a method to delete a user with an id
  public async delete(req: Request, res: Response) {
    try {
      // get the params from the request
      const params = req.params;

      // delete a user with the params.id using the user service
      const message = await this.userService.delete(params.id);

      // send a response with status 200 and message
      res.status(200).send({ message });
    } catch (err) {
      // pass the error to the next middleware or controller
            // send a response with status 200, token, and user
            res.status(200).send({ token, user });
        } catch (err) {
          // pass the error to the next middleware or controller
          next(err);
        }
      }
    
      // define a method to verify a token and get the user
      public async verify(req: Request, res: Response) {
        try {
          // get the token from the request header
          const token = req.header('Authorization')?.replace('Bearer ', '');
    
          // if there is no token, throw an error
          if (!token) {
            throw new Error('No token provided');
          }
    
          // verify the token and get the payload using the user service
          const payload = await this.userService.verify(token);
    
          // get the user from the payload using the user service
          const user = await this.userService.read({ id: payload.id });
    
          // if there is no user, throw an error
          if (!user) {
            throw new Error('Invalid token');
          }
    
          // send a response with status 200 and user
          res.status(200).send(user);
        } catch (err) {
          // pass the error to the next middleware or controller
          next(err);
        }
      }
    }
    