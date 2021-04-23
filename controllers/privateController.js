'use strict';

class PrivateController {
    index(req, res, next) {
        
        if(!req.session.loggedUser) {
            res.redirect("/login");
            return;
        }

        res.render('private');
    }
}

module.exports = new PrivateController();