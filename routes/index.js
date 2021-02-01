var express = require('express');
var router = express.Router();
const axios = require('axios');
const { response } = require('express');


/* GET home page. */
router.get('/', function(req, res, next) {
  const filter = req.query;  
  const response = getProduct(filter).catch(err => console.log(err));
  res.locals.products = response;
  res.render('index');
});

async function getProduct(filter){
  const url = constant.API_PATH+"/api/products/";
  return response = await axios.get(url,{
    params: filter
  });   
}


module.exports = router;
