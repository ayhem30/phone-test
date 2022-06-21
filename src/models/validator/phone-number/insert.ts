import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import * as Joi from 'joi';

const insertPhoneNumberSchema = Joi.object({
  phone: Joi.string()
    .trim()
    .required()
    .pattern(/^(09|639|\+639)\d{9}$/),
});

interface InsertPhoneNumberValidatorSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    phone: string;
  };
}

export { insertPhoneNumberSchema, InsertPhoneNumberValidatorSchema };
