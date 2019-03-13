const express = require('express')
const app = express()
const { mongoose } = require('./config/db') // to connect to database
const {categoriesController} = require('./app/controllers/categories_controller')
const {productsController} = require('./app/controllers/products_controller')
const {usersController} = require('./app/controllers/users_controller')
const cors = require('cors')

app.use(express.json())
app.use(cors())

const port = 3003

app.get('/', function(req, res){
    res.send('welcome to the lunch box website')
})

app.use('/categories', categoriesController)
app.use('/products', productsController)
app.use('/users', usersController)


app.listen(port, function(){
    console.log('listening to port', port)
})