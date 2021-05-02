'use strict';

//get image thumbnail 
const cote = require('cote');
const jimp = require('jimp');
const path = require('path');


const responder = new cote.Responder({name: 'Thumbnail Service'});


responder.on('get thumbnail', async (req,done) => {
    const {path} = req;
    const image = await jimp.read(path);
    await image.resize(100, 100, jimp.RESIZE_BEZIER);
    await image.writeAsync(path+"_thumbnail");
    done('Done');
});
