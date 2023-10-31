// ProductService.ts
import { Product } from '../models/Product';
import { RedisService } from './RedisService';
import { resizeImage } from '../utils/sharp';
import { IService } from '../interfaces/IService';

// define the service class for the product entity
export default class ProductService implements IService {
  // define a private property for the redis service instance
  private redisService: RedisService;

  // define the constructor that takes a redis service instance as a parameter
  constructor(redisService: RedisService) {
    this.redisService = redisService;
  }

  // define a method to create a product with some data
  public async create(data: any) {
    // check if the data has an image file
    if (data.image) {
      // resize the image and get the output file name and path
      const { outputFileName, outputPath } = await resizeImage(data.image);

      // update the data with the output file name and path
      data.image = outputFileName;
      data.imagePath = outputPath;
    }

    // create a product with the data using the product model
    const product = await Product.create(data);

    // return the product
    return product;
  }

  // define a method to read products with some query
  public async read(query: any) {
    // get the page and limit from the query or use default values
    const page = query.page || 1;
    const limit = query.limit || 10;

    // calculate the offset for pagination
    const offset = (page - 1) * limit;

    // define a cache key using the query parameters
    const cacheKey = `products:${page}:${limit}`;

    // try to get the cached data from the redis service using the cache key
    const cachedData = await this.redisService.get(cacheKey);

    // if there is cached data, return it as JSON
    if (typeof cachedData === 'string') {
      return JSON.parse(cachedData);
    }

    // otherwise, get the products from the database using the product model
    const products = await Product.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    // cache the products data in the redis service using the cache key and an expiration time of 10 minutes
    this.redisService.set(cacheKey, JSON.stringify(products), 600);

    // return the products
    return products;
  }

  // define a method to update a product with an id and some data
  public async update(id: any, data: any) {
    // check if the data has an image file
    if (data.image) {
      // resize the image and get the output file name and path
      const { outputFileName, outputPath } = await resizeImage(data.image);

      // update the data with the output file name and path
      data.image = outputFileName;
      data.imagePath = outputPath;
    }

    // find a product by id using the product model
    const product = await Product.findByPk(id);

    // if there is no product, throw an error
    if (!product) {
      throw new Error('Product not found');
    }

    // update the product with the data using the product model
    await product.update(data);

    // return the updated product
    return product;
  }

  // define a method to delete a product with an id
  public async delete(id: any) {
    // find a product by id using the product model
    const product = await Product.findByPk(id);

    // if there is no product, throw an error
    if (!product) {
      throw new Error('Product not found');
    }

    // delete the product using the product model
    await product.destroy();

    // return a message indicating success
    return 'Product deleted successfully';
  }
}
