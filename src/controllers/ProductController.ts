// ProductController.ts

import { Request, Response, NextFunction } from 'express'; 

import ProductService from '../services/ProductService';
const { RedisService } =require( '../services/RedisService');
const { validateData, productSchema } =require( '../utils/joi');
const  Controller  =require( '../interfaces/IController');


// define the controller class for the product entity
export default class ProductController extends Controller { // extend the abstract class
  // define a private property for the product service instance
  private productService: ProductService;

  // define the constructor that takes a product service instance as a parameter
  constructor(productService: ProductService) {
    super(productService); // call the super constructor with the service instance
    this.productService = productService;
  }

  // define a method to get all products with pagination and caching
  public async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // get the query parameters from the request
      const query = req.query;

      // get the products from the product service using the query
      const products = await this.productService.read(query);

      // send a response with status 200 and products
      res.status(200).send(products);
    } catch (err) {
      // pass the error to the next middleware or controller
      next(err);
    }
  }

  // define a method to create a product with some data and an image file
  public async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // get the body and file from the request
      const body = req.body;
      const file = req.file;

      // validate the body with the product schema using the joi utility
      const { error, value } = validateData(body, productSchema);

      // if there is an error, throw it
      if (error) {
        throw error;
      }

      // add the file to the value object
      value.image = file;

      // create a product with the value object using the product service
      const product = await this.productService.create(value);

      // send a response with status 201 and product
      res.status(201).send(product);
    } catch (err) {
      // pass the error to the next middleware or controller
      next(err);
    }
  }

  // define a method to update a product with an id, some data, and an optional image file
  public async put(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // get the params, body, and file from the request
      const params = req.params;
      const body = req.body;
      const file = req.file;

      // validate the body with the product schema using the joi utility
      const { error, value } = validateData(body, productSchema);

      // if there is an error, throw it
      if (error) {
        throw error;
      }

      // add the file to the value object
      value.image = file;

      // update a product with the params.id and value object using the product service
      const product = await this.productService.update(params.id, value);

      // send a response with status 200 and product
      res.status(200).send(product);
    } catch (err) {
      // pass the error to the next middleware or controller
      next(err);
    }
  }

  // define a method to delete a product with an id
  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // get the params from the request
      const params = req.params;

      // delete a product with the params.id using the product service
      const message = await this.productService.delete(params.id);

      // send a response with status 200 and message
      res.status(200).send({ message });
    } catch (err) {
      // pass the error to the next middleware or controller
      next(err);
    }
  }
}
