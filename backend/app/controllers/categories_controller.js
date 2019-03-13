const express = require('express')
const router = express.Router()
const {Category} = require('../models/category')
const {Product} = require('../models/product')


// const {ObjectID} = require('mongodb')

//validate id

router.get('/', function(req, res){
    Category.find().then(function(categories){
        res.send(categories)
    }).catch(function(err){
        res.send(err)
    })
})

router.get('/:id', function(req, res){
    let id = req.params.id
    Category.findById(id).then(function(category){
        Product.find({ category: category._id })
            .then(function(products){
                res.send({
                     category,
                    products
                })
            })
    }).catch(function(err){
        res.send(err)
    })
})

router.post('/', function(req, res){
    let body = req.body
    let newCategory = new Category(body)

    newCategory.save().then(function(category){
        res.send(category)
    }).catch(function(err){
        res.send(err)
    })
})


router.put('/:id', function(req, res){
    let id = req.params.id
    let body = req.body

    Category.findByIdAndUpdate(id, {$set: body}, {new: true}).then(function(category) {
        //$set: body}, {new: true}

        res.send(category)
    }).catch(function(err){
        res.send(err)
    })
})


router.delete('/:id', function(req, res){
    let id = req.params.id
    Category.findByIdAndDelete(id).then(function(category){
        res.send({
            notice: 'successfully deleted the record'
        })
    }).catch(function(err){
        res.send(err)
    })
})

module.exports ={
    categoriesController: router
}