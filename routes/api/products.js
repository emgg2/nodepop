const { RSA_PKCS1_OAEP_PADDING } = require('constants');
var express = require('express');
const Product = require('../../models/Product');
var router = express.Router();
const asyncHandler = require('express-async-handler')

/* GET products list */
router.get('/', asyncHandler(async(req, res, next) => {
  
  const limit = req.query.limit; 
  const skip = req.query.skip;
  // const min_price = req.query.min_price;
  // const max_price = req.query.max_price;
  const name = req.query.name;
  const tags = req.query.tag;

  let filter = "";
   

  if(!limit) {
    const limit = 10;
  }

  if(!skip) {
    const skip = 0;
  }

  if (name) {
    filter.name = name;
  }

  if(tags) {
    filter.tags = tags;
  }

  const result = await Product.find(filter,limit,skip,fields,sort);
  res.json(result);
}));



module.exports = router;
