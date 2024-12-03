import { celebrate, Joi, Segments } from 'celebrate';

export const create_employee_validator = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        role: Joi.string().allow('manager', 'salesman').required(),
        name: Joi.string().trim().required()
      })
      .unknown(false),
    [Segments.QUERY]: Joi.object({}).unknown(false),
    [Segments.PARAMS]: Joi.object({}).unknown(false)
  },
  { abortEarly: false }
);

export const update_employee_validator = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        name: Joi.string().trim().max(55).optional(),
        role: Joi.string().allow('manager', 'salesman').optional(),
        email: Joi.string().trim().email().optional(),
        cpf: Joi.string().trim().length(11).optional(),
        phone: Joi.string().trim().length(11).optional()
      })
      .unknown(false),
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required()
    }).unknown(false),
    [Segments.QUERY]: Joi.object({}).unknown(false)
  },
  { abortEarly: false }
);

export const list_employee_validator = celebrate({
  [Segments.QUERY]: Joi.object({}).unknown(false),
  [Segments.BODY]: Joi.object({}).unknown(false),
  [Segments.PARAMS]: Joi.object({}).unknown(false)
});

export const show_employee_validator = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.number().required()
  }).unknown(false),
  [Segments.QUERY]: Joi.object({}).unknown(false),
  [Segments.BODY]: Joi.object({}).unknown(false)
});

export const delete_employee_validator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required()
  },
  [Segments.QUERY]: Joi.object({}).unknown(false),
  [Segments.BODY]: Joi.object({}).unknown(false)
});
