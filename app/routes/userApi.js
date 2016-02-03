'use strict';

var bodyParser = require('body-parser');
var User = require('../model/user_model');
var jwt = require('jsonwebtoken');
var config = require('../../config');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {
    var userRouter = express.Router();

    // route to authenticate a user (POST http://localhost: 3000/user/authenticate)
    userRouter.post('/authenticate', function(req, res) {

        User.findOne({
            username: req.body.username
        }).select('name username password').exec(function(err, user) {
            if (err) {
                throw err;
            };

            // no user with that username was found
            if (!user) {
                res.json({
                    success: false,
                    message: 'Authentication failed, user not found'
                });
            } else if (user) {
                // check if password matches
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    res.json({
                        success: false,
                        message: 'Authentication failed, wrong password'
                    });
                } else {

                    // if user is found, and password is right, create a token
                    var token = jwt.sign({
                        name: user.name,
                        username: user.username
                    }, superSecret, {
                        expiresInMinutes: 1440
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy',
                        token: token
                    })
                }
            }
        })
    })



    // ============================================================================================
    // on routes that in /users
    userRouter.route('/users')
        // create a user (access at POST http://localhost:3000/api/users
        .post(function(req, res) {
            // create a new instance of the User Model
            var user = new User();
            // set the users name(comes from the request)
            user.name = req.body.name;
            user.username = req.body.username;
            user.password = req.body.password;
            user.save(function(err) {
                if (err) {
                    if (err.code === 11000) {
                        return res.json({
                            success: false,
                            message: 'A user with that username has already exists.'
                        });
                    } else {
                        return res.send(err);
                    }
                } else {
                    res.json({message: 'User created!'})
                }
            })
        })
        // get all users
        .get(function(req, res) {
            User.find({}, function(err, users) {
                if (err) {
                    res.send(err);
                } else {
                    // return the users
                    res.json({success: true, data: users});
                }
            })
        })

    // route middleware to verify a token
    userRouter.use(function(req, res, next) {
        // do logging
        console.log('some body just came to the app');

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, superSecret, function(err, decoded) {
                if (err) {
                    res.status(403).send({
                        success: false,
                        message: 'failed to authenticate token.'
                    })
                } else {
                    // if everything is ok, save to request for use in other routes
                    req.decoded = decoded;
                    //make sure we go to the next routes and don't stop here
                    next();
                }
            });
        } else {
            // if there is no token
            // return an HTTP response of 403 (access forbidden) and an error message
            res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });
    return userRouter;
}



















