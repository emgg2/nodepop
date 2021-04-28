const { RSA_PKCS1_OAEP_PADDING } = require('constants');
var express = require('express');
const Tag = require('../../models/Tag');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const jwtAuth = require ('../../lib/jwtAuth');

/* GET tags list */
router.get('/', asyncHandler(async(req, res, next) => {
  
  
  const result = await Tag.find();
  res.json(result);
}));


module.exports = router;
