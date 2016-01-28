$(function() {
	'use strict';

	$(document).on('pageInit', '#product_detail', function(e, id, page) {
		$(page).on('click', '.open-about', function() {
			$.popup('.popup-about');
		});
        
        
	})

	

	$.init();
});