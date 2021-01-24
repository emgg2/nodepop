const { RSA_PKCS1_OAEP_PADDING } = require('constants');
var express = require('express');
var router = express.Router();

/* New Product */
router.post('/product/new', (req, res, next) => {
  
  
  res.send('Create a new product');
});


module.exports = router;
