import Joi from 'joi';

const categorySchema = Joi.object({
  category_name: Joi.string().required()
});

export const categoryValidate = (value) => {
  return categorySchema.validate(value); 
};



