import { Request, Response } from 'express';
import PhoneNumberModel from '../../models/schema/phone';

const deleteHandler = async (req: Request, res: Response) => {
  const phoneId = +req.params.id;
  const data = await PhoneNumberModel.findOne({ phoneId });

  if (!data) {
    return res.status(404).send({
      message: "Phone number data doesn't exist.",
    });
  }

  data.delete();

  return res.status(200).send({
    message: 'Phone number deleted successfully.',
    data,
  });
};

export default deleteHandler;
