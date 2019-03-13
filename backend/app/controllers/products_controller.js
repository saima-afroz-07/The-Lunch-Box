const express = require('express')
const router = express.Router()
const {Category} = require('../models/category')
const {Product} = require('../models/product')

router.get('/', function(req, res){
    Product.find().then(function(products){
        res.send(products)
    }).catch(function(err){
        res.send(err)
    })
})

router.get('/:id', function(req, res){
    let id = req.params.id
    Product.findById(id).then(function(product){
        res.send(product)
    }).catch(function(err){
        res.send(err)
    })
})

router.post('/', function(req, res){
    let body = req.body
    let newProduct = new Product(body)
    newProduct.save().then(function(product){
        res.send(product)
    }).catch(function(err){
        res.send(err)
    })
})

router.put('/:id', function(req, res){
    let id = req.params.id
    let body = req.body
    Product.findByIdAndUpdate(id, { $set: body}, {new: true}).then(function(product){
        res.send(product)
    }).catch(function(err){
        res.send(err)
    })
})

router.delete('/:id', function(req, res){
    let id = req.params.id
    Product.findByIdAndDelete(id).then(function(){
        res.send({
            notice: 'successfully deleted the product'
        })
    }).catch(function(err){
        res.send(err)
    })
})

module.exports = {
    productsController: router
}