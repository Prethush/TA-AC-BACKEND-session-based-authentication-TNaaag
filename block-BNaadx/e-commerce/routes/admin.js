let express = require('express');
let router = express.Router();
let Product = require('../models/products');

//render all the product 
router.get('/products', (req, res, next) => {
    Product.find({}, (err, products) => {
        if(err) return next(err);
        res.render('adminProductList', {products});
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

//render product details page
router.get('/products/:id', (req, res, next) => {
    let id = req.params.id;
    Product.findById(id, (err, product) => {
        if(err) return next(err);
        res.render('adminProductDetails', {product});
    })
});
 
//render product edit form
router.get('/products/:id/edit', (req, res, next) => {
    let id = req.params.id;
    Product.findById(id, (err, product) => {
        if(err) return next(err);
        res.render("productEditForm", {product});
    })
});

//edit products
router.post('/products/:id', (req, res, next) => {
    let id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, (err, product) => {
        if(err) return next(err);
        res.redirect('/admin/products/' + id);
    })
});

//delete products
router.get('/products/:id/delete', (req, res, next) => {
    let id = req.params.id;
    Product.findByIdAndDelete(id, (err, product) => {
        if(err) return next(err);
        res.redirect('/admin/products');
    })
});

//increment likes
router.get('/products/:id/likes', (req, res, next) => {
    let id = req.params.id;
    Product.findByIdAndUpdate(id, {$inc: {likes: 1}}, (err, product) => {
        if(err) return next(err);
        res.redirect('/admin/products/' + id);
    })
});

module.exports = router;