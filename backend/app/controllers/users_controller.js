const express = require('express')
const router = express.Router()
const {User} = require('../models/user')

//authentication
const {authenticateUser} = require('../middlewares/authentication')


router.post('/register', function(req, res){
    
  let body = req.body
  let user = new User(body)

  user.save().then(function(user){
      return user.generateToken()
  }).then(function(token){
      //res.header('x-auth', token).send() // ?header
      res.send({token})
  }).catch(err => {
    res.send(err)
  })
})

router.post('/login', function(req , res){
  let body = req.body
  User.findByCredentials(body.email, body.password).then(function(user){
      return user.generateToken()
  }).then(function(token){
      //res.header('x-auth', token).send()
      res.send({token})
  }).catch(function(err){
      res.status(401).send(err)
  })
})



router.get('/profile',authenticateUser, function(req, res){
    let user = req.user
    res.send({
        username: user.username,
        email: user.email,
        mobile: req.user.mobile

    })
})

router.delete('/logout',authenticateUser, function(req, res){
    const {user, token} = req
    const tokenInfo = user.tokens.find(function(tokenItem){
        return tokenItem.token == token
    })
   user.tokens.id(tokenInfo._id).remove()
   user.save().then((user) => {
       res.send({
           notice: 'successfully logged out'
       })
   })
})


module.exports = {
    usersController : router
}