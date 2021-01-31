const { RSA_PKCS1_OAEP_PADDING } = require('constants');
var express = require('express');
var router = express.Router();

const Product = require('../../models/Product');
const asyncHandler = require('express-async-handler');
const { restart } = require('nodemon');

/* GET products list */
router.get('/', asyncHandler(async(req, res, next) => {
 
  let limit = parseInt(req.query.limit); 
  let skip = parseInt(req.query.skip);
  const min_price = req.query.min_price;
  const max_price = req.query.max_price;
  const name = req.query.name;
  const tags = req.query.tag;
  let filter = {};
   

 if(!limit) {
    limit = 10;
 }
   
 if(!skip) {
    skip = 0;
 }
  
  if (name) {
    filter.name = name;
  }
  if(tags) {
    filter.tags = tags;
  }

  if(max_price && min_price){
    filter.price = {$gt: min_price, $lt: max_price }
  }

  if(max_price && !min_price){
    filter.price = {$lt: max_price}
  }

  if(!max_price && min_price){
    filter.price = {$gt: min_price}
  }

  const result = await Product.getlist(filter,limit,skip);
  
  res.json(result);
}));


router.post('/new', asyncHandler(async(req,res,next)=> {
  const productData = req.body;
  const product = new Product (productData);
  const productCreated = await product.save();
  res.status(201).json({result: productCreated});

}));


module.exports = router;
