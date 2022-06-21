import { Schema, model } from 'mongoose';

interface PhoneNumber {
  phoneId: number;
  phoneNumber: string;
}

const PhoneNumberSchema = new Schema<PhoneNumber>({
  phoneId: { type: Number, default: 0 },
  phoneNumber: { type: String, require: true },
});

const PhoneNumberModel = model<PhoneNumber>('PhoneNumber', PhoneNumberSchema);

export default PhoneNumberModel;
