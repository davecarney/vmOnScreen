/*
* vmOnScreen() 1.0.0
*
* Copyright 2018
*
* By Dave Carney & John Finch, https://vehiclemedia.com/
* Scroll Watching plugin
* 
* 	activate with:
* 		$('.vm-anim').vmOnScreen();
*
* 	watches for:
*		.vm-anim
*
* 	switches class:
* 		.vm-anim to .vm-onscreen
*		Target those classes to do whatever you need.
*
*/

(function ( $ ) {
	$.fn.vmOnScreen = function() {

		function init() {
			$('.vm-anim').each(function() {
				var animStart = $(window).height() * 0.75;
				var top = $(window).scrollTop();
				if (top > ($(this).offset().top - animStart)) {
					$(this).removeClass('vm-anim').addClass('vm-onscreen');
					return;
				}
			});
		}

		init();

		var vmThrottle = 4;

		$(window).scroll(function() {
			vmThrottle++;
			if (vmThrottle === 5) {
				init();
				vmThrottle = 0;
			}
		});

	};
}( jQuery ));

