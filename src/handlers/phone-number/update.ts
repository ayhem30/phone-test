import { Request, Response } from 'express';
import PhoneNumberModel from '../../models/schema/phone';

const updateHandler = async (req: Request, res: Response) => {
  const { phone } = req.body;
  const { id } = req.params;

  const data = await PhoneNumberModel.findOne({ phoneId: +id });

  if (!data)
    return res.status(404).send({
      message: "Phone number doesn't exist.",
    });

  data.phoneNumber = `0${phone.substr(phone.length - 10)}`;
  data.save();

  return res.status(200).send({
    message: 'Phone number updated successfully.',
    data,
  });
};

export default updateHandler;
