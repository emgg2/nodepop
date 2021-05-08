'use strict';

const { User } = require ('../models');
const jwt = require ('jsonwebtoken');
const nodemailer = require('nodemailer');

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
            const user = await User.findOne({email});
    
            if(!user || !(await user.comparePassword(password))) {                
                res.locals.email = email;
                res.locals.error = 'Invalid credentials';
                res.render('login');
                return;
            }

             
            //set _id in user session 
            req.session.loggedUser = {
                _id: user._id
            }
  
             //send email
             const info = await user.sendEmailToUser ('This is the subject', 'Welcome to nodepop');
             console.log('Message sent: %s ', info.messageId);
             console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.redirect('/private');
             
         } catch (error) {
             next(error);
         }
    }


 /**
     * POST /loginJWT
     *     
     */

  async postJWT(req,res,next) {
    try {        
       const {email,password} = req.body;
       const user = await User.findOne({email});

       if(!user || !(await user.comparePassword(password))) {
           const error = new Error('Invalid credentials');
           error.status = 401;
           next(error);
           return;
       }

       //create JWT token and return to client
       jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '2h'}, (err, jwtToken) => {
           if (err) {
               next(err);
               return;
           }
           res.json({token: jwtToken});
       })

       //set _id in user session 
    //    req.session.loggedUser = {
    //        _id: user._id
    //    }
       
        
    } catch (error) {
        next(error);
    }
}




    
    logout(req, res, next) {
        debugger;
        req.session.regenerate(err => {
            if(err) {
                next(err);
                return;
            }
            res.redirect("/");
        })
    }
}

module.exports = new LoginController();