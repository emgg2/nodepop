'use strict';

module.exports = (req, res, next) => {

    if(!req.session.loggedUser) {
       res.redirect("/login");
       return;
    }
    next();
};