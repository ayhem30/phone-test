import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

const apiUrl = `${process.env.BASE_URL || 'http://localhost'}:${
  process.env.PORT || 3000
}`;

describe('API Connectivity Test', () => {
  test('must be 200', async () => {
    const { status, body } = await request(apiUrl).get('/');
    expect(status).toBe(200);
    expect(body.message).toEqual('Connected Successfully!');
  });
});
