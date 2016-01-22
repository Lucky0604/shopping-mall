$(function() {
    var loading = false;
    var maxItems = 100;
    var itemsPreload = 20;

    function addItems(number, lastIndex) {
        var html = '';
        for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
            html += '<li class="item-content"><div class="item-inner"><div class="item-title">Item ' + i + '</div></div></li>';
        };
        // add new items
        $('.infinite-scroll-bottom .list-container').append(html);
    }

    addItems(itemsPreload, 0);

    var lastIndex = 20;

    $(document).on('infinite', '.infinite-scroll-bottom', function() {
        if (loading) {
            return;
        }

        loading = true;

        setTimeout(function() {
            loading = false;
            if (lastIndex >= maxItems) {
                $.detachInfiniteScroll($('.infinite-scroll'));

                $('.infinite-scroll-preloader').remove();
                return;
            }
            addItems(itemsPreload, lastIndex);
            lastIndex = $('.list-container li').length;
            $.refreshScroller();
        }, 1000);
    });
})
