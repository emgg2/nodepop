'use strict';

const mongoose = require ('mongoose');

const productSchema = mongoose.Schema({
    "name": String,
    "sale": Boolean,
    "price": Number,
    "picture": String,
    "tags": [String]
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
