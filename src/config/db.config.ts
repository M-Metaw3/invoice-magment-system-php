// Import the mysql module
const mysql= require( "mysql");
const { PoolConnection } =require( "mysql");
// Define the database connection parameters
const dbConfig = {
  host: process.env.DB_HOST || "localhost", // The host name or IP address of the MySQL server
  user: process.env.DB_USER || "root", // The user name for the MySQL server
  password: process.env.DB_PASSWORD || "", // The password for the MySQL server
  database: process.env.DB_NAME || "e-commerce", // The name of the database to use
};

// Create a pool of connections to the database
const pool = mysql.createPool(dbConfig);

// Export a function that returns a promise of a connection from the pool
export const getConnection = (): Promise<mysql.PoolConnection> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err); // Reject the promise if there is an error
      } else {
        resolve(connection); // Resolve the promise with the connection
      }
    });
  });
};
