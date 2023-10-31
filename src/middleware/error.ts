// error.ts
const { Request, Response, NextFunction } = require('express');

// define the middleware function for error handling
export const error = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // send a response with status 500 and message
  res.status(500).send({ message: err.message });
};
