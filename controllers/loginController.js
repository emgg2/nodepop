'use strict';

const { User } = require ('../models');

class LoginController {

  
    index(req, res, next) {
        res.locals.email = '';
        res.locals.error = '';      
        res.render('login');
    }

    /**
     * POST /login
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     async post(req,res,next) {
         try {
            const {email,password} = req.body;
            console.log("eva", email, password);

            const user = await User.findOne({email});
    
            if(!user || await user.comparePassword(password)) {
                res.locals.email = email;
                res.locals.error = 'Invalid credentials';
                res.render('login');
                return;
            }

            res.redirect('/login');
             
         } catch (error) {
             next(error);
         }
    }
}

module.exports = new LoginController();