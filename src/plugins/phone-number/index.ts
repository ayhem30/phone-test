import { Router, Response } from 'express';
import { ValidatedRequest, createValidator } from 'express-joi-validation';

import {
  getPhoneNumberHandler,
  updatePhoneNumberHandler,
  deletePhoneNumberHandler,
  insertPhoneNumberHandler,
} from '../../handlers/index';

import {
  updatePhoneNumberSchema,
  UpdatePhoneNumberValidatorSchema,
  deletePhoneNumberSchema,
  DeletePhoneNumberValidatorSchema,
  insertPhoneNumberSchema,
  InsertPhoneNumberValidatorSchema,
} from '../../models/validator/index';

const router = Router();
const validator = createValidator({ passError: true });

router.post(
  '/phone-number',
  validator.body(insertPhoneNumberSchema),
  (req: ValidatedRequest<InsertPhoneNumberValidatorSchema>, res: Response) => {
    insertPhoneNumberHandler(req, res);
  },
);
router.put(
  '/phone-number/:id',
  validator.body(updatePhoneNumberSchema.body),
  validator.params(updatePhoneNumberSchema.params),
  (req: ValidatedRequest<UpdatePhoneNumberValidatorSchema>, res: Response) => {
    updatePhoneNumberHandler(req, res);
  },
);
router.delete(
  '/phone-number/:id',
  validator.params(deletePhoneNumberSchema),
  (req: ValidatedRequest<DeletePhoneNumberValidatorSchema>, res: Response) => {
    deletePhoneNumberHandler(req, res);
  },
);
router.get('/phone-numbers', getPhoneNumberHandler);

export = router;
