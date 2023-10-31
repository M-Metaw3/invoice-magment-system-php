// bcrypt.ts
const bcrypt =require( 'bcrypt');

// define the salt rounds for hashing
const saltRounds = 10;

// create a function to hash a plain text password
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};

// create a function to compare a plain text password with a hashed password
export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
