'use strict';

const mongoose = require ('mongoose');

const productSchema = mongoose.Schema({
    "name": {type:String, index:true},
    "sale": {type:Boolean, index:true},
    "price": {type:Number, index:true},
    "picture": String,
    "tags": {type:[String], index:true}
},
{
    collection: 'products'
})

productSchema.statics.getlist = function (filter,limit,skip,sort){
    const query = Product.find(filter);
    query.limit(limit);
    query.skip(skip);
    // query.select(fields);
     query.sort(sort);
    return query.exec();
}
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
