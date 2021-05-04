'use strict';

class ChatController {
    async index(req, res, next) {
        

        res.render('chat');
    }
}

module.exports = new ChatController();