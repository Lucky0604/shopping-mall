$(function() {
	'use strict';

	console.log('123');
	var url = window.location.pathname;
	var id = url.substring(url.lastIndexOf('/') + 1);
    GetJsonData.getJsonNoData('/api/products/' + id, function(res) {
        console.log(res); 	
    })

	$(document).on('pageInit', '#product_detail', function(e, id, page) {
		$(page).on('click', '.open-about', function() {
			$.popup('.popup-about');
		});
        
        
	})

	

	$.init();
});


