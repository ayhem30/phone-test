import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import * as Joi from 'joi';

const deletePhoneNumberSchema = Joi.object({
  id: Joi.number().required(),
});

interface DeletePhoneNumberValidatorSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    id: number;
  };
}

export { deletePhoneNumberSchema, DeletePhoneNumberValidatorSchema };
