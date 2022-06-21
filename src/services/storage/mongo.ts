/* eslint-disable dot-notation */
import { connect, disconnect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDownstream = async () => {
  if (!process.env.MONGO_URI) throw Error('Mongo URI Missing.');

  const mongoUri: string = process.env.MONGO_URI;

  await connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }).catch(() => {
    throw Error('Unable to Connect to Mongo');
  });
};
const closeDownstream = async () => {
  disconnect();
};

export { connectDownstream, closeDownstream };
