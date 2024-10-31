import { celebrate, Joi, Segments } from 'celebrate';

export const create_personal_data_validator = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        name: Joi.string().max(100).required(),
        email: Joi.string().email().required(),
        cpf: Joi.string().length(11).required(),
        phone: Joi.string().min(11).max(13).optional()
      })
      .unknown(false),
    [Segments.QUERY]: Joi.object({}).unknown(false),
    [Segments.PARAMS]: Joi.object({}).unknown(false)
  },
  { abortEarly: false }
);

export const update_personal_data_validator = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        name: Joi.string().max(100).required(),
        email: Joi.string().email().required(),
        cpf: Joi.string().length(11).required(),
        phone: Joi.string().min(11).max(13).optional()
      })
      .unknown(false),
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required()
    }).unknown(false),
    [Segments.QUERY]: Joi.object({}).unknown(false)
  },
  { abortEarly: false }
);

export const delete_personal_data_validator = celebrate(
  {
    [Segments.PARAMS]: {
      id: Joi.number().required()
    },
    [Segments.QUERY]: Joi.object({}).unknown(false),
    [Segments.BODY]: Joi.object({}).unknown(false)
  },
  { abortEarly: false }
);
