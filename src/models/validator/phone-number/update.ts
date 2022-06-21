import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import * as Joi from 'joi';

const updatePhoneNumberSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({
    phone: Joi.string()
      .trim()
      .required()
      .pattern(/^(09|639|\+639)\d{9}$/),
  }),
};

interface UpdatePhoneNumberValidatorSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    phone: string;
  };
  [ContainerTypes.Params]: {
    id: string;
  };
}

export { updatePhoneNumberSchema, UpdatePhoneNumberValidatorSchema };
