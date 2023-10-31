// userRoutes.ts
import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { auth } from '../middleware/auth';

// create an Express router
const router = Router();

// create a User service instance
const userService = new UserService();

// create a User controller instance with the User service instance as a parameter
const userController = new UserController(userService);

// define the routes for the user entity using the User controller methods and the auth middleware
router.get('/', userController.get); // get all users (not implemented)
router.post('/', userController.post); // create a user with some data
router.put('/:id', auth, userController.put); // update a user with an id and some data (requires authentication)
router.delete('/:id', auth, userController.delete); // delete a user with an id (requires authentication)
router.post('/login', userController.login); // login a user with an email and a password
router.get('/verify', auth, userController.verify); // verify a token and get the user (requires authentication)

// export the router for importing in other files
export default router;
