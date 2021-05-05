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
                        userName: 'User Sample 1',
                    },
                };
                const response = await request(app)
                    .post('/api/user/signup')
                    .set('Content-type', 'application/json')
                    .set('Authorization', `Bearer ${token}`)
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
                const response = await request(app)
                    .get('/api/user/login')
                    .set('Authorization', `Bearer ${token}`);
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
        console.log('    Token Ready...');
    });
    describe('POST /api/tasks/new-task', function () {
        it('creates a new task Sample 1', async function () {
            const data = {
                token: this.token,
                task: { taskTitle: 'sample task 1', dueDate: '2021-06-10' },
            };
            const response = await request(app)
                .post('/api/tasks/new-task')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${this.token}`)
                .send(data);
            // console.log(response.body);
            assert.ok(response.body);
        });
        it('creates a new task Sample 2', async function () {
            const data = {
                token: this.token,
                task: { taskTitle: 'sample task 2', dueDate: '2021-07-10' },
            };
            const response = await request(app)
                .post('/api/tasks/new-task')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${this.token}`)
                .send(data);
            // console.log(response.body);
            assert.ok(response.body);
        });
        it('creates a new task Sample 3', async function () {
            const data = {
                token: this.token,
                task: { taskTitle: 'sample task 3', dueDate: '2021-07-17' },
            };
            const response = await request(app)
                .post('/api/tasks/new-task')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${this.token}`)
                .send(data);
            // console.log(response);
            assert.ok(response.body);
            assert.equal(response.status, 201);
        });
    });
    describe('GET /api/tasks', function () {
        it('retrieves all tasks for the current user', async function () {
            const response = await request(app)
                .get('/api/tasks')
                .set('Authorization', `Bearer ${this.token}`);
            // console.log(response.body.tasks[0]._id);
            assert.equal(response.status, 200);
            assert.isArray(response.body.tasks);
            // console.log(response.body);
        });
    });
    describe('DELETE /api/task', function () {
        before(async function () {
            const response = await request(app)
                .get('/api/tasks')
                .set('Authorization', `Bearer ${this.token}`);
            // console.log(response.body.tasks[0]._id);
            this.taskId = response.body.tasks[0]._id;
        });
        it('deletes a single task', async function () {
            const data = { taskId: this.taskId };

            const response = await request(app)
                .del('/api/tasks')
                .set('Authorization', `Bearer ${this.token}`)
                .send(data);

            // console.log(response.body);
            assert.equal(response.status, 200);
            assert.isObject(response.body);
        });
    });
});
