import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

const apiUrl = `${process.env.BASE_URL || 'http://localhost'}:${
  process.env.PORT || 3000
}`;

describe('HTTP PUT /phone-number', () => {
  test('Successful update with 09 prefix.', async () => {
    const random = Math.random().toString().slice(2, 11);
    const { status, body } = await request(apiUrl)
      .post('/phone-number')
      .send({
        phone: `09${random}`,
      });
    expect(status).toBe(200);
    expect(body).toHaveProperty('phoneId');

    const { status: updateStatus, body: updateBody } = await request(apiUrl)
      .put(`/phone-number/${+body.phoneId}`)
      .send({
        phone: `09${Math.random().toString().slice(2, 11)}`,
      });

    expect(updateStatus).toBe(200);
    expect(updateBody.message).toBe('Phone number updated successfully.');
  });

  test('Error 404 on updating non-existing phone number.', async () => {
    const { status: updateStatus, body: updateBody } = await request(apiUrl)
      .put(`/phone-number/232342342344`)
      .send({
        phone: `09${Math.random().toString().slice(2, 11)}`,
      });

    expect(updateStatus).toBe(404);
    expect(updateBody.message).toBe(`Phone number doesn't exist.`);
  });

  test('Error 422 on blank phone number parameter', async () => {
    const { status: updateStatus, body: updateBody } = await request(apiUrl)
      .put(`/phone-number/232342342344`)
      .send({
        phone: '',
      });

    expect(updateStatus).toBe(422);
    expect(updateBody.message).toBe(`Phone number must be a valid format`);
  });

  test('Error 422 on blank id parameter', async () => {
    const { status: updateStatus, body: updateBody } = await request(apiUrl)
      .put(`/phone-number/:id`)
      .send({
        phone: `09${Math.random().toString().slice(2, 11)}`,
      });

    expect(updateStatus).toBe(422);
    expect(updateBody.message).toBe(`Invalid id parameter value`);
  });
});
