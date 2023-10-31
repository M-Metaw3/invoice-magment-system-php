// jwt.ts
const  jwt =require( 'jsonwebtoken');

// define your secret key and expiration time
export const secret = 'your-secret-key';
export const expiresIn = '1h';

// create a function to sign a token with a payload
export const signToken = (payload: any) => {
  return jwt.sign(payload, secret, { expiresIn });
};

// create a function to verify a token and return the payload
export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
