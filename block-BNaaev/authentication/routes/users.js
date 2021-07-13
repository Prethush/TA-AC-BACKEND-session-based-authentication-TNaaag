var express = require('express');
var router = express.Router();
let User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if(err) return next(err);
    console.log(user);
    res.redirect('/users');
  })
});

module.exports = router;
