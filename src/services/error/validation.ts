import { Request, Response, NextFunction } from 'express';
import { ExpressJoiError } from 'express-joi-validation';

const validationErrorHandler = (
  err: any | ExpressJoiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  switch (err.error.details[0].type) {
    case 'any.required':
      res.status(422).send({ message: 'phone body parameter is required' });
      break;
    case 'string.pattern.base':
    case 'string.empty':
      res.status(422).send({ message: 'Phone number must be a valid format' });
      break;
    case 'number.base':
      res.status(422).send({ message: 'Invalid id parameter value' });
      break;
    default:
      res.status(422).send({ message: err.error.details[0].message });
      break;
  }
};

export default validationErrorHandler;
