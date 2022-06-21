import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

const apiUrl = `${process.env.BASE_URL || 'http://localhost'}:${
  process.env.PORT || 3000
}`;

describe('HTTP POST /phone-number', () => {
  test('Successful insert with 09 prefix', async () => {
    const random = Math.random().toString().slice(2, 11);
    const { status, body } = await request(apiUrl)
      .post('/phone-number')
      .send({ phone: `09${random}` });
    expect(status).toBe(200);
    expect(body.phoneId).toBeDefined();
  });

  test('Successful insert with 639 prefix', async () => {
    const random = Math.random().toString().slice(2, 11);
    const { status, body } = await request(apiUrl)
      .post('/phone-number')
      .send({ phone: `639${random}` });
    expect(status).toBe(200);
    expect(body.phoneId).toBeDefined();
  });

  test('Successful insert with +639 prefix', async () => {
    const random = Math.random().toString().slice(2, 11);
    const { status, body } = await request(apiUrl)
      .post('/phone-number')
      .send({ phone: `+639${random}` });
    expect(status).toBe(200);
    expect(body.phoneId).toBeDefined();
  });

  test('Error on invalid phone number format', async () => {
    const random = Math.random().toString().slice(2, 5);
    const { status, body } = await request(apiUrl)
      .post('/phone-number')
      .send({
        phone: `9999${random}`,
      });
    expect(status).toBe(422);
    expect(body.message).toBe('Phone number must be a valid format');
  });

  test('Error on empty phone number format', async () => {
    const { status, body } = await request(apiUrl).post('/phone-number').send({
      phone: '',
    });
    expect(status).toBe(422);
    expect(body.message).toBe('Phone number must be a valid format');
  });
});
