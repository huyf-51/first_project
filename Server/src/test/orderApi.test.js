const app = require('../app.js');
const request = require('supertest');
const mongoose = require('mongoose');

let token;

describe('test order api', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        const res = await request(app)
            .post('/user/login')
            .send({ email: 'admin@gmail.com', password: 'Admin111***' });
        token = res._body.auth.accessToken;
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('POST /order/get-order-by-id FAIL', (done) => {
        request(app)
            .get(`/order/get-order-by-id/${1}`)
            .set('Authorization', token)
            .then((res) => {
                expect(res.statusCode).toBe(500);
                done();
            });
    });
});
