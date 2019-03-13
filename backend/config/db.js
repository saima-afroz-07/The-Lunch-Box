const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/lunch-Box-App', {useNewUrlParser: true}).then(function(){
    console.log('connected to db')
}).catch(function(){
    console.log('error connecting to db', err)
})

module.exports = {
    mongoose
}