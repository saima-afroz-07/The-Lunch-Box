const mongoose = require('mongoose')
const Schema = mongoose.Schema

const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: {
            validator: function(value){
                return validator.isEmail(value)
            },
            message: function(){
                return 'email id is not invalid'
            }
        }
    },
    
    password: {
        type: String,
        minlength: 8,
        maxlength: 128,
        required: true
    },
    mobile: {
        type: String,
        unique: true,
        required: true,
        minlength: 10,
        maxlength: 10,
        validator : {
            validator: function(value){
                return validator.isNumeric(value)
            },
            message: function(){
                return 'mobile number not valid'
            }
        }
    },
    tokens: [{
        token: {
            type: String
        }
    }]
})

//encrypting the password, and pre-saving it
userSchema.pre('save', function(next){
    let user = this
    if(user.isNew){
        bcryptjs.genSalt(10).then(function(salt){
            bcryptjs.hash(user.password, salt).then(function(encrypted){
                user.password = encrypted
                next()
            })
        }).catch(function(err){
            console.log(err)
        })
    }else{
        next()
    }
})

//to define our instance method for generating token
userSchema.methods.generateToken = function(){
    let user = this
    let tokenData = {
        userId: this._id
        // role (admin)
    }
    let jwtToken = jwt.sign(tokenData, 'supersecret')
    user.tokens.push({token: jwtToken})
    return user.save().then(function(user){
        return jwtToken
    })
}

userSchema.statics.findByCredentials = function(email, password){
    let User = this
    return User.findOne({email: email}).then(function(user){
        if(!user){
            return Promise.reject('invalid email or password')
        } 

        return bcryptjs.compare(password, user.password).then(function(res){
            if(res){
                return Promise.resolve(user)
            }else {
                return Promise.reject('invalid email or password')
            }
        })
    })
}

userSchema.statics.findByToken = function(token){
    let User = this
    let tokenData 
    try{
        tokenData = jwt.verify(token, 'supersecret')
    } catch (err){
        return Promise.reject(err.message)
    }
    return User.findOne({
        '_id': tokenData.userId,
        'tokens.token': token
    })
}

const User = mongoose.model('User', userSchema)
module.exports = {
    User 
}