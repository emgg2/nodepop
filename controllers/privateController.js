'use strict';
const imagdom = require('imagdom');

class PrivateController {
    async index(req, res, next) {
        
        console.log()
 const confImage = {
      findBy: 'yellow+flowers',
      lang: 'es',
      image_type: 'photo',
      orientation: 'vertical',
      category: 'nature'
    };
    const image = await imagdom.getImage(confImage);
    console.log("imagen", image);

        res.render('private');
    }
}

module.exports = new PrivateController();