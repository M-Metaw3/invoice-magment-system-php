// server.ts
import app from './src/app';

// define the port and environment variables
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

// listen for incoming requests on the port
app.listen(port, () => {
  console.log(`Server running in ${env} mode on port ${port}`);
});
