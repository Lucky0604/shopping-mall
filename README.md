# shopping-mall
shopping mall mobile client

## First step  
TODOS:  
finish the view pages.


## tips:  
1, popup  

	<div class="page">
        <div class="content">
            <div class="content-block">
                <p><a href="#" class="open-about">
                    Open popup
                </a></p>
            </div>
        </div>

        
    </div>

    <div class="popup popup-about">
        <div class="content-block">
            <p><a href="#" class="close-popup">Close</a></p>
        </div>
    </div>

popup须放在page容器外，否则z-index会使popup在遮罩层之下

2, ajax取值

后台Model定义：

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        bcrypt = require('bcrypt-nodejs');

    // product schema
    var ProductSchema = new Schema({
        // _id: {type: String, trim: true},
        p_name : String,
        p_color: {type: String, required: true},
        p_size: {type: String}
    });

    module.exports = mongoose.model('Product', ProductSchema);


获取单个product方法：

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


前台通过ajax获取此条数据

    GetJsonData.getJsonNoData('/api/products/:product_id', function(res) {
        console.log(res);
    })

此时会报错：CastError: Cast to ObjectId failed for value “[object...[object Object]" at path "_id"]

修改为：

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);
    GetJsonData.getJsonNoData('/api/products/' + id, function(res) {
        console.log(res);
    })

这是因为ajax调用'/api/products/:product_id'，此时:product_id是采用硬编码（hardcoded）发送的，而不是一个真实的值。

因此需要从当前url中parse product_id，然后当成$ajax.get/post的url参数传进去