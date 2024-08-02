const app = require('../app.js');
const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/User.js');

describe('test user api', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        await User.deleteMany({
            role: {
                $ne: 'admin',
            },
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('POST /user/register SUCCESS', (done) => {
        request(app)
            .post('/user/register')
            .send({
                email: '1@gmail.com',
                password: 'Huy111**',
                confirmPassword: 'Huy111**',
            })
            .then((res) => {
                expect(res._body).toMatchObject({ status: 'success' });
                expect(res.statusCode).toBe(200);
                done();
            });
    });

    test('POST /user/register FAIL (email is exist)', async () => {
        const res = await request(app).post('/user/register').send({
            email: '1@gmail.com',
            password: 'Huy111**',
            confirmPassword: 'Huy111**',
        });
        expect(res.statusCode).toBe(500);
        expect(res._body).toHaveProperty('message', 'the email is exist');
    });

    test('POST /user/login SUCCESS', async () => {
        const res = await request(app)
            .post('/user/login')
            .send({ email: '1@gmail.com', password: 'Huy111**' });
        expect(res.statusCode).toBe(200);
        expect(res._body).toHaveProperty('data');
        expect(res._body).toHaveProperty('auth');
    });

    test('POST /user/login FAIL (Incorrect email or password)', (done) => {
        request(app)
            .post('/user/login')
            .send({ email: 'wrong email', password: 'Huy111**' })
            .then((res) => {
                expect(res.statusCode).toBe(400);
                expect(res._body).toHaveProperty(
                    'message',
                    'Incorrect email or password'
                );
                done();
            });
    });

    test('POST /user/login FAIL (Incorrect email or password)', (done) => {
        request(app)
            .post('/user/login')
            .send({ email: '1@gmail.com', password: 'wrong pass' })
            .then((res) => {
                expect(res.statusCode).toBe(400);
                expect(res._body).toHaveProperty(
                    'message',
                    'Incorrect email or password'
                );
                done();
            });
    });
});
