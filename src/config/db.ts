// db.ts
const Sequelize = require( 'sequelize');

// create a Sequelize instance with your database credentials
export const sequelize = new Sequelize('e-commerce', 'username', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  }
});

// test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established.');
  })
  .catch((err:any) => {
    console.error('Unable to connect to the database:', err);
  });
