import { Request, Response } from 'express';
import PhoneNumberModel from '../../models/schema/phone';

const getHandler = async (req: Request, res: Response) => {
  const phoneNumbers = await PhoneNumberModel.find(
    {},
    { phoneId: 1, phoneNumber: 1, _id: 0 },
  ).sort({ phoneId: 1 });
  return res.status(200).send({
    phoneNumbers,
  });
};

export default getHandler;
