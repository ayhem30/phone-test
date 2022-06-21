import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

const apiUrl = `${process.env.BASE_URL || 'http://localhost'}:${
  process.env.PORT || 3000
}`;

describe('HTTP DELETE /phone-number', () => {
  const random = Math.random().toString().slice(2, 11);

  test('Successful Insert then Delete of phone number.', async () => {
    const phoneNumber = `09${random}`;

    const { status, body } = await request(apiUrl).post('/phone-number').send({
      phone: phoneNumber,
    });
    expect(status).toBe(200);
    expect(body.phoneId).toBeDefined();

    const { status: deleteStatus, body: deleteBody } = await request(
      apiUrl,
    ).delete(`/phone-number/${body.phoneId}`);

    expect(deleteStatus).toBe(200);
    expect(deleteBody.message).toBe(`Phone number deleted successfully.`);
  });

  test('HTTP Code 404 on deleting of non-existing phone number.', async () => {
    const { status, body } = await request(apiUrl).delete(
      `/phone-number/${+Date.now()}`,
    );
    expect(status).toBe(404);
    expect(body.message).toBe(`Phone number data doesn't exist.`);
  });

  test('HTTP Code 422 on missing :id parameter.', async () => {
    const { status, body } = await request(apiUrl).delete('/phone-number/:id');
    expect(status).toBe(422);
    expect(body.message).toBe(`Invalid id parameter value`);
  });
});
