'use strict';
const nodemailer = require('nodemailer');

module.exports = async function () {

    let testAccount = await nodemailer.createTestAccount();

    const developTransport = { 
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
            }
        };
        
        const prodTransport = {
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_SERVICE_USER,
                pass: process.env.EMAIL_SERVICE_PASS
            },
            Authorization: Bearer 
        }
        
        const transportInfo = process.env.NODE_ENV === 'dev' ?
        developTransport:
        prodTransport;
        
        return nodemailer.createTransport(transportInfo);
        
    }