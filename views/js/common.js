var _HOST = window.location.host;

var GetJsonData = {
    postJson: function(url, data, callbackfunc) {
        $.ajax({
            url: 'http://' + _HOST + url,
            type: 'POST',
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            dataType: 'json',
            success: callbackfunc, 
            error: function(xhr, status) {
                var sessionStatus = xhr.getResponseHeader('SessionStatus');
                if (sessionStatus && sessionStatus === 'timeout') {
                    $.toast('请求超时');
                }
            }
        });
    },
    
    getJson: function(url, data, callbackfunc) {
        $.ajax({
            url: 'http://' + _HOST + url,
            type: 'GET',
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            dataType: 'json',
            success: callbackfunc,
            error: function(xhr, status) {
                var sessionStatus = xhr.getResponseHeader('SessionStatus');
                if (sessionStatus && sessionStatus === 'timeout') {
                    $.toast('请求超时');
                }
            }
        })
    },
    
    getJsonNoData: function(url, callbackfunc) {
        $.ajax({
            url: 'http://' + _HOST + url,
            type: 'GET',
            processData: false,
            contentType: false,
            cache: false,
            dataType: 'json',
            success: callbackfunc,
            error: function(xhr, status) {
                var sessionStatus = xhr.getResponseHeader('SessionStatus');
                if (sessionStatus && sessionStatus === 'timeout') {
                    $.toast('请求超时');
                };
            }
        });
    }
}
console.log(_HOST);