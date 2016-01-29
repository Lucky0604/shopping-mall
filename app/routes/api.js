var bodyParser = require('body-parser');
    Product = require('../model/product_model');
    
    
module.exports = function(app, express) {
    var apiRouter = express.Router();
    
    // test route to make sure everything is working
    apiRouter.get('/', function(req, res) {
        res.json({message: 'this is api routes'});
    })
    
    // add product
    apiRouter.route('/products')
        .post(function(req, res) {
            // create a new Product instance
            var product = new Product();
            // set the product's config
            product.p_name = req.body.p_name;
            product.p_color = req.body.p_color;
            product.p_size = req.body.p_size;
            
            product.save(function(err) {
                if (err) {
                    return res.send(err);
                } else {
                    res.json({message: 'Product created'});
                };
            })
        })
        // list all products
        .get(function(req, res) {
            Product.find({}, function(err, products) {
                if (err) {
                    res.send(err);
                } else {
                    // return the products
                    res.json({success: true, data: products});
                }
            });
        });
    
    // add product_detail
    apiRouter.route('/products/:product_id')
        // get single product detail
        .get(function(req, res) {
            Product.findById(req.params.product_id, function(err, product) {
                if (err) {
                    res.send(err);
                };
                res.json({success: true, data: product});
            });
        })
        // update the user with this id
        .put(function(req, res) {
            Product.findById(req.params.product_id, function(err, product) {
                if (err) {
                    res.send(err);
                };

                // set the new product information if it exists in the request
                if (req.body.p_name) {
                    product.p_name = req.body.p_name;
                };
                if (req.body.p_color) {
                    product.p_color = req.body.p_color;
                }
                if (req.body.p_size) {
                    product.p_size = req.body.p_size;
                }

                // save the user
                product.save(function(err) {
                    if (err) {
                        res.send(err);
                    } else {
                        // return a message
                        res.json({message: 'Product updated'});
                    }
                })
            })
        })
        // delete the user with this id
        .delete(function(req, res) {
            Product.remove({
                _id: req.params.product_id
            }, function(err, product) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({message: 'Successfully deleted!'});
                };
            })
        });
    return apiRouter;
}