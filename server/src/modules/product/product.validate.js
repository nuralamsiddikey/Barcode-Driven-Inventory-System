import Joi from 'joi';

const productSchema = Joi.object({
  barcode: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'any.required': 'Barcode is required.',
      'number.base': 'Barcode must be a number.',
      'number.positive': 'Barcode must be a positive number.',
      'number.integer': 'Barcode must be an integer.',
    }),
  
  material: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'any.required': 'Material is required.',
      'number.base': 'Material must be a number.',
      'number.positive': 'Material must be a positive number.',
      'number.integer': 'Material must be an integer.',
    }),
  
  category: Joi.string()
    .optional()
    .default('Uncategorized')
    .messages({
      'string.base': 'Category must be a string.',
    }),

  description: Joi.string()
    .required()
    .messages({
      'any.required': 'Description is required.',
      'string.base': 'Description must be a string.',
    }),

  name: Joi.string()
    .optional()
    .allow('')
    .messages({
      'string.base': 'Name must be a string.',
    }),

  details: Joi.object()
    .optional()
    .default({})
    .messages({
      'object.base': 'Details must be an object.',
    }),
});

export const productValidate = (value) => {
  return productSchema.validate(value); 
};



const productQuerySchema = Joi.object({
  category: Joi.string().optional()
});


export const productQueryValidate = (value) => {
  return productQuerySchema.validate(value);
};



const productCategoryUpdateSchema = Joi.object({
  category: Joi.string().required()
});


export const productCategoryUpdateValidate = (value) => {
  return productCategoryUpdateSchema.validate(value);
};

