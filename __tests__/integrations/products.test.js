
const request = require('supertest');
const app = require('../../app');
const jestConfig = require('../../jest.config');
const axios = require('axios');
const { Products } = require('../../models/index');

jest.mock('axios');

describe('Testing / Products', () => {
    describe('GET / products', () => {
        beforeAll(() => {
            const products = [
                {
                    "name": "iPhone 3GS",
                    "sale": false,
                    "price": 550.00,
                    "picture": "./images/iphone.jpeg",
                    "tags": [ "lifestyle", "mobile"]
                },
                {
                    "name": "Xiaomi Redmi",
                    "sale": false,
                    "price": 130.00,
                    "picture": "./images/xiaomi.jpeg",
                    "tags": [ "lifestyle", "mobile"]
                }
            ];
            const response = {data: products};
            
        });
        it('should status code 200', async () => {
            expect.assertions(1);
            try {
                const res = await request(app).get('/api/products');
                expect(res.statusCode).toEqual(200);            
            } catch (error) {}
            
        })  
      
    })

    describe('POST / Products',  () =>{
        it('should return 201 after create a new Product', async () => {
            expect.assertions(1);
            try {
                const res = await request(app).post('/api/products/new');
                expect(res.statusCode).toEqual(201);    

            } catch (error) {
                
            }
            
        })
    })


 });