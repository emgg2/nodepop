var express = require('express');
var router = express.Router();

/* GET products list */
router.get('/products/list', (req, res, next) => {
  res.send('Lista de productos');
});

/* GET tags list */
router.get('/products/tags', (req, res, next) => {
  res.send('Lista de tags');
});




module.exports = router;
