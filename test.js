const { assert } = require('chai');
const request = require('supertest');

const app = require('./server');

describe('GET /', function () {
    it('Server working', async function () {
        const response = await request(app).get('/').send();
        assert.equal(response.text, 'Server working');
    });
    it('Status 200', async function () {
        const response = await request(app).get('/').send();
        assert.equal(response.status, 200);
    });
    it('Response type "text/html"', async function () {
        const response = await request(app).get('/').send();
        assert.equal(response.type, 'text/html');
    });
});

describe('/api/signup', async function () {
    describe('POST /api/signup', async function () {
        it('Creates a new user', async function () {
            const data = {
                data: {
                    login: {
                        email: 'sample1@gmaill.com',
                        password: '134234234',
                    },
                    userInfo: {
                        userName: 'John Doe',
                    },
                },
            };

            const response = await request(app)
                .post('/api/signup')
                .set('Content-type', 'application/json')
                .send(data);

            assert.isObject(response.body);
            assert.equal(response.status, 200);
        });
    });
});
