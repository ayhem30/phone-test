import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'http';
import compression from 'compression';
import express from 'express';
import {
  connectDownstream,
  closeDownstream,
  validationErrorHandler,
} from './services/index';
import phoneNumberPlugins from './plugins/phone-number/index';

let server: Server;
dotenv.config();

const init = async () => {
  const app = express();

  app.use(cors());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.disable('x-powered-by');

  await connectDownstream();

  const port = process.env.PORT || 3000;

  app.get('/', (req, res) =>
    res.status(200).send({ message: 'Connected Successfully!' }),
  );
  app.use('/', phoneNumberPlugins);

  app.use(validationErrorHandler);

  server = app.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}`);
  });
};

const abort = async () => {
  await new Promise((resolve) => server.close(resolve));
  await closeDownstream();
};

export { init, abort };
