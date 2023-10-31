// productRoutes.ts
import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { ProductService } from '../services/ProductService';
import { RedisService } from '../services/RedisService';
import { auth } from '../middleware/auth';

// create an Express router
const router = Router();

// create a Redis service instance
const redisService = new RedisService(redis);

// create a Product service instance with the Redis service instance as a parameter
const productService = new ProductService(redisService);

// create a Product controller instance with the Product service instance as a parameter
const productController = new ProductController(productService);

// define the routes for the product entity using the Product controller methods and the auth middleware
router.get('/', productController.get); // get all products with pagination and caching
router.post('/', auth, productController.post); // create a product with some data and an image file (requires authentication)
router.put('/:id', auth, productController.put); // update a product with an id, some data, and an optional image file (requires authentication)
router.delete('/:id', auth, productController.delete); // delete a product with an id (requires authentication)

// export the router for importing in other files
export default router;
