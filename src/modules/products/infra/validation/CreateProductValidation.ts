import { celebrate, Joi, Segments } from 'celebrate';

export const create_product_validator = celebrate(
  {
    [Segments.BODY]: Joi.object({
      product: Joi.object({
        name: Joi.string().max(100).required(),
        description: Joi.string().max(255).required(),
        category: Joi.string().required(),
        brand: Joi.string().required(),
        material: Joi.string().required(),
        gender: Joi.string().required(),
        image_url: Joi.string().optional()
      }),
      product_info: Joi.object({
        size: Joi.string().required(),
        color: Joi.string().required(),
        prize: Joi.number().positive().required(),
        quantity: Joi.number().required()
      })
    })
  },
  { abortEarly: false }
);

// export const delete_product_validator = celebrate({
//   [Segments.PARAMS]: {
//     id: Joi.number().required()
//   }
// });
