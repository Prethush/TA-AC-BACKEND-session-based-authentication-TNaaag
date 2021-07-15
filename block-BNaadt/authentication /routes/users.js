var express = require('express');
var router = express.Router();
let User = require('../models/users');

/* render users page */
router.get('/', function(req, res, next) {
  console.log(req.session);
  res.render('dashboard');
});

//render register page
router.get('/register', (req, res, next) => {
  let error = req.flash('error')[0];
  let alert = req.flash('alert')[0];
  res.render('register', {error, alert});
});

//handle register request
router.post('/register', (req, res, next) => {
  let {email, passwd} = req.body;
  User.findOne({email}, (err, user) => {
    if(err) return next(err);
    if(user) {
      req.flash("error", "Email is not unique");
      return res.redirect('/users/register');
    } 
    if(passwd.length < 4) {
      req.flash("alert", "Password length is less than 4");
      return res.redirect('/users/register');
    }
    User.create(req.body, (err, user) => {
      if(err) return next(err);
      res.redirect('/users');
    })
  });
  
  
});

//render login page
router.get('/login', (req, res, next) => {
  
  let error = req.flash('error')[0];
  let alert = req.flash("alert")[0];
  let info = req.flash("info")[0];
  res.render('login', {error, alert, info});
});

//processing login request
router.post('/login', (req, res, next) => {
  let {email, passwd} = req.body;
  if(!passwd || !email) {
    req.flash('info', "Email/Password is not passed");
    return res.redirect('/users/login');
  }
  User.findOne({email}, (err, user) => {
    if(err) return next(err);
    if(!user) {
      req.flash("error", "Email is not registered");
      return res.redirect('/users/login');
    }
    user.verifyPasswd(passwd, (err, result) => {
      if(err) return next(err);
      if(!result) {
        req.flash("alert", "Invalid Password");
        return res.redirect('/users/login');
      }
      req.session.userId = user.id;
      res.redirect('/users');
    })
  })
});

//logout
router.get('/logout', (req, res, next) => {
  res.clearCookie('connect.sid');
  res.redirect('/users');
});
module.exports = router;
