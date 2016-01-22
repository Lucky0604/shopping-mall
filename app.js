var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
	res.render('index');
})

app.get('/products', function(req, res) {
	res.render('view/products/products');
});

app.get('/shopping', function(req, res) {
	res.render('view/shoppinglist/shopping');
})
app.get('/products/product_detail', function(req, res) {
	res.render('view/product_detail/product_detail');
})

app.listen(3000, '127.0.0.1', function() {
	console.log('server is listening on port 3000');
})