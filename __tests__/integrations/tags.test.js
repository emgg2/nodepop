const request = require('supertest');
const app = require('../../app');

describe('Testing / Tags', () => {
    describe('GET / Tags', () => {
        it('should status code 200', async () => {
            expect.assertions(1);
            const res = await request(app).get('/api/tags');
            expect(res.statusCode).toEqual(200);            
        })   


    })  

});