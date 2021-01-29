'use strict';

const mongoose = require ('mongoose');

const productSchema = mongoose.Schema({
    "name": String,
    "sale": Boolean,
    "price": Number,
    "picture": String,
    "tags": [String]
},
{
    collection: 'products'
})

productSchema.statics.getlist = function (filtro,limit,skip,fields,sort){
    const query = Product.find(filtro);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    return query.exec();
}
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
