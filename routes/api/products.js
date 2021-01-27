const { RSA_PKCS1_OAEP_PADDING } = require('constants');
var express = require('express');
const Product = require('../../models/Product');
var router = express.Router();
const asyncHandler = require('express-async-handler')

/* GET products list */
router.get('/list', asyncHandler(async(req, res, next) => {
  
  // const page = req.query.page;
  // const num_articles_page = req.query.num_article_page;
  // const price_max = req.query.price_max;
  // const price_min = req.query.price_min;
  // const article_name = req.query.article_name;
  // const article_tag = req.query.article_tag;

  const result = await Product.find();
  res.json(result);
}));

/* GET tags list */
router.get('/tags', (req, res, next) => {
  res.send('Lista de tags');
});




module.exports = router;
