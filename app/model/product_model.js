var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

// product schema
var ProductSchema = new Schema({
    p_name : String,
    p_color: {type: String, required: true},
    p_size: {type: String}
});

module.exports = mongoose.model('Product', ProductSchema);