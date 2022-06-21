import * as app from './app';

app.init();

process.on('unhandledRejection', async () => {
  app.abort();
  process.exit(-1);
});
