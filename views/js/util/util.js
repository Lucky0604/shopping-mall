/**
 * Created by Administrator on 2016/2/3.
 */

var Util = {
    isArray: function(arr) {
        return '[object Array]' === Object.prototype.toString.call(arr);
    },
    isEmail: function(str) {
        return /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/.test(str);
    },
    isMobile: function(str) {
        return /^1\d{10}$/.test(str);
    }
}