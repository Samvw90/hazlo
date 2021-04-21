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
