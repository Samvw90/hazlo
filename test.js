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
    before(async function () {
        const response = await request(app)
            .del('/test/all-users/delete')
            .send();

        // console.log(response.text);
        console.log('    Firebase Auth + MondoDB ready');
    });
    describe('POST /api/user/signup', async function () {
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
    });
    describe('POST /api/user/login', async function () {
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
                // console.log(response.body.data.tasks);
                assert.ok(response.body);
            }
        });
    });
});

describe('Tasks API test', function () {
    before(async function () {
        const email = 'sample1@gmaill.com';
        const password = '134234234';
        const response = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);

        this.token = await response.user.getIdToken(true);
        // console.log(this.token);
    });
    it('POST /api/tasks/new-task', async function () {
        const data = {
            token: this.token,
            task: { taskTitle: 'sample task 1', dueDate: '2021-06-10' },
        };
        const response = await request(app)
            .post('/api/tasks/new-task')
            .set('Content-type', 'application/json')
            .send(data);
        // console.log(response.body);
        assert.ok(response.body);
    });
});
