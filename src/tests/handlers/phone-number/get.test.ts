import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

const URL = `${process.env.BASE_URL || 'http://localhost'}:${
  process.env.PORT || 3000
}`;

describe('HTTP GET /phone-numbers', () => {
  test('Successful Response with phoneNumbers', async () => {
    const { status, body } = await request(URL).get('/phone-numbers');
    expect(status).toBe(200);
    expect(body).toHaveProperty('phoneNumbers');
  });
});
