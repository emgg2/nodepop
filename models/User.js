'use strict';

const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');
const emailTransportConfigure = require('../lib/emailTransportConfigure');

const userSchema = mongoose.Schema({
    email: { type:String, unique:true},
    password: String
});

userSchema.statics.hashPassword = function (unHashedPassword) {
    return bcrypt.hash(unHashedPassword,8);
}

userSchema.methods.comparePassword = function(unHasedPassword) {
    return bcrypt.compare(unHasedPassword, this.password);
}

userSchema.methods.sendEmailToUser = async function(subject, content) {
    //create a transport
    const transport = await emailTransportConfigure();
 
    // send the email

    return transport.sendMail({
        from : process.env.EMAIL_SERVICE_FROM,
        to: this.email,
        subject,
        html: content
    })

}

const User = mongoose.model('User', userSchema);
module.exports=User;