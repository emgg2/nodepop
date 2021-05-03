'use strict';
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //take jwtToken from header (or wherever)
    const jwtToken = req.get('Authorization') || req.query.token || req.body.token;
  
    //check if is there token
    const token = jwtToken.split(' ')[1];    
    if(!token) {
        const error = new Error('Missing token');
        error.status = 401;
        next(error);
        return;
    }

    //check if token is valid
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        //payload -> tokent content
        if(err) {
            err.status = 401;
            next(err);  
            return;
        }

        req.apiAuthUserId = payload._id;
        next();
    });

    
};