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

describe('Auth API Test', function () {
    describe('/api/signup', async function () {
        describe('POST /api/signup', async function () {
            it('Creates a new user', async function () {
                const data = {
                    signup: {
                        email: 'sample1@gmaill.com',
                        password: '134234234',
                        userName: 'Sample 1',
                    },
                };

                const response = await request(app)
                    .post('/api/user/signup')
                    .set('Content-type', 'application/json')
                    .send(data);

                // console.log(JSON.parse(response.text).token);

                assert.isObject(response.body);
                assert.equal(response.status, 201);
                assert.equal(JSON.parse(response.text).data.name, 'Sample 1');
            });
        });
    });

    // describe('/api/user/logout', async function() {})

    after(async function () {
        const response = await request(app)
            .del('/test/all-users/delete')
            .send();

        // console.log(response.text);
        console.log('    Firebase Auth + MondoDB ready');
    });
});
