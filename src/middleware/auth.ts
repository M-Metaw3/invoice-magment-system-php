// auth.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt';
import { UserService } from '../services/UserService';

// define the middleware function for authentication
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get the token from the request header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // if there is no token, throw an error
    if (!token) {
      throw new Error('No token provided');
    }

    // verify the token using the jwt utility and get the payload
    const payload = verifyToken(token);

    // create a user service instance
    const userService = new UserService();

    // get the user from the payload using the user service
    const user = await userService.read({ id: payload.id });

    // if there is no user, throw an error
    if (!user) {
      throw new Error('Invalid token');
    }

    // attach the user to the request object
    req.user = user;

    // pass the request to the next middleware or controller
    next();
  } catch (err) {
    // handle the error by sending a response with status 401 and message
    res.status(401).send({ message: err.message });
  }
};
