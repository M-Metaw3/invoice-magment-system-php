// app.ts
const express =require( 'express');
// import * as path from 'path';
// import * as cors from 'cors';
// import * as morgan from 'morgan';
// import * as helmet from 'helmet';
// import * as multer from 'multer';
import { sequelize } from './config/db';
// import { redis } from './config/redis';
// import { userRoutes, productRoutes } from './routes';
// import { error } from './middlewares';

// create an Express instance
const app = express();

// use some middlewares for security, logging, cors, json parsing, and static files
// app.use(helmet());
// app.use(morgan('dev'));
// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, '..', 'public')));
// app.use(morgan('tiny'))
// // use multer as a middleware for handling file uploads
// app.use(multer().single('image'));

// // use the routes defined in the routes folder
// app.use('/users', userRoutes);
// app.use('/products', productRoutes);

// // use the error middleware for error handling
// app.use(error);

// connect to the database using sequelize
sequelize
  .sync()
  .then(() => {
    console.log('Database connection established.');
  })
  .catch((err:any) => {
    console.error('Unable to connect to the database:', err);
  });

// connect to Redis using redis
// redis.on('connect', () => {
//   console.log('Redis connection established.');
// });

// redis.on('error', (err) => {
//   console.error('Unable to connect to Redis:', err);
// });

// export the app for importing in other files
export default app;
