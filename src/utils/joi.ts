// joi.ts
const Joi =require( 'joi');

// define the schema for validating a user
export const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// define the schema for validating a product
export const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  description: Joi.string().optional(),
  image: Joi.string().optional()
});

// create a function to validate a data object with a schema
export const validateData = (data: any, schema: Joi.ObjectSchema) => {
  return schema.validate(data, { abortEarly: false });
};
