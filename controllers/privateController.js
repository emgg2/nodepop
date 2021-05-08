'use strict';
const imagdom = require('imagdom');

class PrivateController {
    async index(req, res, next) {
    
    const confImage = {
      findBy: 'picture',
      lang: 'es',
      image_type: 'photo',
      orientation: 'vertical',
      category: 'people'
    };

    let images = [];
    images.push(await imagdom.getImage(confImage));
    images.push(await imagdom.getImage(confImage));
    images.push(await imagdom.getImage(confImage));

    res.render('private', {images});
    }
}

module.exports = new PrivateController();