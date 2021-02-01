var express = require('express');
var router = express.Router();
const axios = require('axios');
const { response } = require('express');


/* GET home page. */
router.get('/', function(req, res, next) {
  const filter = req.query;  
  const url_path = "/api/products";
  const products = getData(filter,url_path,res).catch(err => console.log(err));   
  


});

async function getData(filter, url_path, res){
  const url = constant.API_PATH+url_path;
  const response = await axios.get(url,{
    params: filter
  }); 
 
  const products =  response.data;
  res.render('index', { products });
  
}

module.exports = router;
