$(function() {
	'use strict';

	$(document).on('pageInit', '#product_detail', function(e, id, page) {
		$(page).on('click', '.open-about', function() {
			$.popup('.popup-about');
		});
        
        GetJsonData.getJsonNoData('/api/products/:product_id', function(res) {
        	console.log(res.data);
        	
        })
        
	})

	

	$.init();
});