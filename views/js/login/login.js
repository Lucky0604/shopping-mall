/**
 * Created by Administrator on 2016/2/3.
 */

$(function() {
    'use strict';

    $(document).on('pageInit', '.login', function(e, id, page) {
        $('#login').on('click', function() {
            var username = $('#username').val();
            console.log(username);
            var password = $('#password').val();
            GetJsonData.getJsonNoData('/api/users', function(res) {
                if (res.success) {
                    for (var i = 0; i < res.data.length; i ++) {
                        if (username === res.data[i].username) {
                            console.log('success');
                        }
                    }
                }
            })
        })
    })

    $.init();
})