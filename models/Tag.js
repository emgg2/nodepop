'use strict';

const mongoose = require ('mongoose');

const tagSchema = mongoose.Schema({
    "name": String
},
{
    collection: 'tags'
})

tagSchema.statics.getlist = function (filtro,limit,skip,fields,sort){
    const query = Tag.find();
    
    return query.exec();
}
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
