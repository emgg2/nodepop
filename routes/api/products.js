const { RSA_PKCS1_OAEP_PADDING } = require('constants');
var express = require('express');
var router = express.Router();
const jwtAuth = require ('../../lib/jwtAuth');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const cote = require('cote');
const requester = new cote.Requester({name: 'thumbnail service'})

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
  const tags = req.query.tags;
  const type = req.query.type;
  const sort = req.query.sort;

  let filter = {};  
  

 if(!limit) {
    limit = 10;
 }
   
 if(!skip) {
    skip = 0;
 }
  
  if(type) {
    filter.sale = (type === 'venta') ? true : false;
  }

  if (name) {
    filter.name = new RegExp("^"+name);
  }

  if(tags) {

    filter.tags = {"$in": tags.split(" ")};
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

  const result = await Product.getlist(filter,limit,skip,sort);
  
  res.json(result);
}));


router.post('/new', upload.single('picture') , asyncHandler(async(req,res,next)=> {
  const productData = req.body;
  const product = new Product (productData);
  const productCreated = await product.save();
  const {picture} = productData;
  console.log("pasa");
  requester.send({
    type: 'get thumbnail',

    picture: picture.split("/")[2],
    url: path.join(__dirname,THUMBNAIL_PATH)
    

}, result => {
    
})
  res.status(201).json({result: productCreated});

}));

router.put('/:id/update', jwtAuth, asyncHandler(async(req,res,next)=> {
  const _id = req.params.id;
  const productData = req.body;

  const productUpdated = await Product.findOneAndUpdate({_id}, productData,
    {
      new:true,
      useFindAndModify: false
    });
  res.status(200).json({result: productUpdated});
}));

router.delete('/:id/delete', jwtAuth, asyncHandler(async(req,res, next)=> {
  const _id = req.params.id;
  await Product.deleteOne({_id});
  res.status(200).json({ result: "Product deleted"});
}));


module.exports = router;
