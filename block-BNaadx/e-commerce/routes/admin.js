let express = require('express');
let router = express.Router();
let Product = require('../models/products');

//render all the product 
router.get('/products', (req, res, next) => {
    Product.find({}, (err, products) => {
        if(err) return next(err);
        res.rednder('productDetails', {products});
    })
});

//render product create page
router.get('/products/new', (req, res, next) => {
    res.render('productCreateForm');
});

//creating products
router.post('/products', (req, res, next) => {
    Product.create(req.body, (err, product) => {
        if(err) return next(err);
        res.redirect('/admin/products');
    })
});



module.exports = router;