$(function () {


    GetJsonData.getJsonNoData('/api/products', function (res) {
        // console.log(res.data);
        // console.log(res.success);
        if (res.success == true) {
            // console.log(res);
            // console.log(res.data[1])
            var loading = false;
            var maxItems = res.data.length;
            var itemsPerLoad = 2;

            function addItems(number, lastIndex) {
                
                var html = '';
                for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
                    console.log(res.data[i]);
                    html += '<div class="col-50"><div class="card demo-card-header-pic"><div class="card-header color-white no-border no-padding" valign="bottom"><a href="/products/product_detail" class="external"><img class="card-cover" src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" /></a></div><div class="card-content"><div class="card-content-inner"><p class="color-gray">发表于' + i + '</p><p>产品名称：' + i + '</p></div></div></div></div>';

                }
                $('.infinite-scroll-bottom #product_list_card').append(html);
            }

            addItems(itemsPerLoad, 0);

            var lastIndex = 2;

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
                    lastIndex = $('#product-card').length;
                    $.refreshScroller();
                }, 1000);
            });
        }
    });

    $(document).on('pageInit', 'product_show', function (e) {
        ProductMessage.init();
    });

    $.init();
});