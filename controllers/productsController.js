'use strict';

const { Product } = require ('../models');
const jwt = require ('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const cote = require('cote');
const requester = new cote.Requester({name: 'thumbnail service'})
const fs = require('fs');
const path = require("path");



class ProductsController {


    
    /**
     * GET /products
     * 
     * @param {*} req 
     * @param {*} rest 
     * @param {*} next 
     */
    async get(req, res, next) {
        try {
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

        } catch (error) {
            next(error);
        }
    }


    /**
     * POST /products
     * 
     * @param {*} req 
     * @param {*} rest 
     * @param {*} next 
     */
    async post (req,res,next)  {
       
        const productData = req.body;
        const product = new Product (productData);
        console.log(productData);
           
        const productCreated = await product.save();
        const file = req.file;
        console.log("Eva", file);
        if(!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
             return next(error)
        } 
        
        //const {picture} = productCreated;

        requester.send({
            type: 'get thumbnail',            
            path: file.path 
            

        }, result => {
            
        })
        res.status(201).json({
           result: productCreated
     
            
        });
    }

 /**
     * PUT /products/:id
     * 
     * @param {*} req 
     * @param {*} rest 
     * @param {*} next 
     */

    async put (req, res, next) {
        const _id = req.params.id;
        const productData = req.body;
      
        const productUpdated = await Product.findOneAndUpdate({_id}, productData,
          {
            new:true,
            useFindAndModify: false
          });
        res.status(200).json({result: productUpdated});

    }

    /**
     * delete /product/:id
     * 
     * @param {*} req 
     * @param {*} rest 
     * @param {*} next 
     */

    async delete (req, res, next) { 
        const _id = req.params.id;
        await Product.deleteOne({_id});
        res.status(200).json({ result: "Product deleted"});
    }
}

module.exports = new ProductsController();