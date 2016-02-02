$(function() {
    'use strict';

    console.log('123');


    $(document).on('pageInit', '#product_detail', function(e, id, page) {
        $(page).on('click', '.open-about', function() {
            $.popup('.popup-about');
        });

        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        GetJsonData.getJsonNoData('/api/products/' + id, function(res) {
            var data = res.data;
            $('#p_name').html(data.p_name);
            $('#p_color').html(data.p_color);
            $('#p_size').html(data.p_size);
        })
    })



    $.init();
});
