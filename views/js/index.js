$(function () {

    function productInfinite(data) {
        var loading = false;
        var maxItems = data.length;
        console.log(maxItems);
        var itemsPerLoad = 2;
        var pList = document.getElementsByClassName('p_list');
        var lastIndex = pList.length;
        function addItems(number, lastIndex) {

            var html = '';
            for (var i = 0; i < lastIndex + number; i++) {
                console.log(data[i]);
                html += '<div class="col-50 p_list"><div class="card demo-card-header-pic"><div class="card-header color-white no-border no-padding" valign="bottom"><a href="/products/product_detail/:product_id" class="external"><img class="card-cover" src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" /></a></div><div class="card-content"><div class="card-content-inner"><p class="color-gray">发表于' + data[i].p_name + '</p><p>产品名称：' + i + '</p></div></div></div></div>';

            }
            $('.infinite-scroll-bottom #product_list_card').append(html);
        }
        addItems(itemsPerLoad, 0);

        $(document).on('infinite', '.infinite-scroll-bottom', function () {
            if (loading) {
                return;
            }

            loading = true;

            setTimeout(function () {
                loading = false;

                if (lastIndex >= maxItems) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.infinite-scroll-preloader').remove();
                    return;
                }

                addItems(itemsPerLoad, lastIndex);
                lastIndex = pList.length;
                $.refreshScroller();
            }, 1000);
        });
    }

    GetJsonData.getJsonNoData('/api/products', function (res) {
        // console.log(res.data);
        // console.log(res.success);
        if (res.success == true) {
            // console.log(res);
            // console.log(res.data[1])
            productInfinite(res.data);
        }
    });

    $(document).on('pageInit', 'product_show', function (e, id, page) {
        ProductMessage.init();
    });

    $.init();
});