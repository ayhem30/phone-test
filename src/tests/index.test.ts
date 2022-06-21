import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const url = process.env.BASE_URL || 'http://localhost';

const URL = `${url}:${port}`;

describe('API Connectivity Test', () => {
  test('must be 200', async () => {
    const res = await request(URL).get('/');
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('Connected Successfully!');
  });
});
