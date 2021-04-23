'use strict';

const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');

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

const User = mongoose.model('User', userSchema);
module.exports=User;