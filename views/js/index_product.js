/**
 * 获取产品信息
 */
var ProductMessage = {
    init: function() {
        var _this = this;
        $.showPreloader('loading');
        setTimeout(function() {
            _this.getData();
        }, 2000);
    },
    
    getData: function() {
        var _this = this;
        GetJsonData.getJsonNoData('/api/products', function(res) {
            console.log(res);
        });
    }
}