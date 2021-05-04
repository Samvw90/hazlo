const { assert } = require('chai');
const request = require('supertest');
const firebase = require('firebase/app');
require('firebase/auth');

const app = require('./server');

describe('GET /', function () {
    before(async function () {
        this.response = await request(app).get('/').send();
    });
    it('Server working', async function () {
        assert.equal(this.response.text, 'Server working');
    });
    it('Status 200', async function () {
        assert.equal(this.response.status, 200);
    });
    it('Response type "text/html"', async function () {
        assert.equal(this.response.type, 'text/html');
    });
});

describe('Auth API Test', function () {
    describe('Test Routes', async function () {
        describe('POST /test/signup', async function () {
            it('Creates a new user on the client side', async function () {
                const email = 'sample1@gmaill.com';
                const password = '134234234';

                const response = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password);

                const token = await response.user.getIdToken(true);

                if (token) {
                    const data = {
                        signup: {
                            email: 'sample1@gmaill.com',
                            userName: 'Sample 1',
                        },
                        token: token,
                    };
                    const response = await request(app)
                        .post('/api/user/signup')
                        .set('Content-type', 'application/json')
                        .send(data);
                    // console.log(response.body);
                    assert.ok(response.body);
                }
            });
            it('Login an existing user', async function () {
                const email = 'sample1@gmaill.com';
                const password = '134234234';

                const response = await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password);

                const token = await response.user.getIdToken(true);
                if (token) {
                    const data = {
                        token: token,
                    };
                    const response = await request(app)
                        .post('/api/user/login')
                        .set('Content-type', 'application/json')
                        .send(data);
                    // console.log(response.body);
                    assert.ok(response.body);
                }
            });
        });
    });

    after(async function () {
        const response = await request(app)
            .del('/test/all-users/delete')
            .send();

        // console.log(response.text);
        console.log('    Firebase Auth + MondoDB ready');
    });
});
