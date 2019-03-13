const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = {
    Product
}