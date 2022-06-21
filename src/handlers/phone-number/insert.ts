import { Request, Response } from 'express';
import PhoneNumberModel from '../../models/schema/phone';

const insertHandler = async (req: Request, res: Response) => {
  const { phone } = req.body;
  const data = await PhoneNumberModel.create({
    phoneId: +Date.now(),
    phoneNumber: `0${phone.substr(phone.length - 10)}`,
  });

  return res.status(200).send({
    message: 'Phone number inserted successfully.',
    phoneId: data.phoneId,
  });
};

export default insertHandler;
