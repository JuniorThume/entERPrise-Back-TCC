import { celebrate, Joi, Segments } from 'celebrate';

export const create_credential_validator = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        employee_id: Joi.number().required(),
        username: Joi.string().max(55).required(),
        password: Joi.string().required()
      })
      .unknown(false),
    [Segments.QUERY]: Joi.object({}).unknown(false),
    [Segments.PARAMS]: Joi.object({}).unknown(false)
  },
  { abortEarly: false }
);

export const update_credential_validator = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        username: Joi.string().max(55).optional(),
        old_password: Joi.string().required(),
        new_password: Joi.string().optional()
      })
      .unknown(false),
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required()
    }).unknown(false),
    [Segments.QUERY]: Joi.object({}).unknown(false)
  },
  { abortEarly: false }
);

export const login_validator = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        username: Joi.string().max(55).required(),
        password: Joi.string().required()
      })
      .unknown(false),
    [Segments.PARAMS]: Joi.object({}).unknown(false),
    [Segments.QUERY]: Joi.object({}).unknown(false)
  },
  { abortEarly: false }
);

export const refresh_token_validator = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        access_token: Joi.string().required()
      })
      .unknown(false),
    [Segments.PARAMS]: Joi.object({}).unknown(false),
    [Segments.QUERY]: Joi.object({}).unknown(false)
  },
  { abortEarly: false }
);

export const list_credential_validator = celebrate({
  [Segments.QUERY]: Joi.object({}).unknown(false),
  [Segments.BODY]: Joi.object({}).unknown(false),
  [Segments.PARAMS]: Joi.object({}).unknown(false)
});

export const delete_credential_validator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required()
  },
  [Segments.QUERY]: Joi.object({}).unknown(false),
  [Segments.BODY]: Joi.object({}).unknown(false)
});
