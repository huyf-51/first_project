const app = require('../app.js');
const request = require('supertest');
const mongoose = require('mongoose');

describe('test product api', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('GET /product/list SUCCESS (no product in database)', (done) => {
        request(app)
            .get('/product/list')
            .query({ keyword: '' })
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res._body).toHaveLength(0);
                done();
            });
    });
});
