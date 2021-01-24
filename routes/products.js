const { RSA_PKCS1_OAEP_PADDING } = require('constants');
var express = require('express');
var router = express.Router();

/* GET products list */
router.get('/products/list', (req, res, next) => {
  
  const page = req.query.page;
  const num_articles_page = req.query.num_article_page;
  const price_max = req.query.price_max;
  const price_min = req.query.price_min;
  const article_name = req.query.article_name;
  const article_tag = req.query.article_tag;
  res.send('Lista de productos');
});

/* GET tags list */
router.get('/tags', (req, res, next) => {
  res.send('Lista de tags');
});




module.exports = router;
