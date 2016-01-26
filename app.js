var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// configure the app handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authentication');
    next();
});

// log all requests to the console
app.use(morgan('dev'));

// connect to the database
mongoose.connect(config.database);


// API ROUTES
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);


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
app.get('/test', function(req, res) {
	res.render('view/test/test');
})

app.listen(config.port);
console.log('server is working on port : ' + config.port);