import Joi from 'joi';

const idSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});


export const idValidate = (id) => {
  return idSchema.validate(id);
};

