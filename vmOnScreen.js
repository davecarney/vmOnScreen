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
* 	watches for elements with class:
*		.vm-anim
*
* 	switches class:
* 		.vm-anim to .vm-onscreen
*		Target those classes to do whatever you need.
*
*	changing defaults:
*		the function is set to fire when the element is at 0.75 of the screen.
*		pass a different percentage to the percent: property to change this (example below)
*
*		You can overide the element to watch for by passing something else to the jQuery object
*		but you must also pass that same element(without the . or #) to the watching property
*
*			$('.some-other-class').vmOnScreen({
*				watching: 'some-other-class',
*				percent: 0.5
*			});
*
*		Use this approach if you want different elements to animate at different percentages
*
*/

(function ( $ ) {
	$.fn.vmOnScreen = function(options) {

		options = $.extend({
			percent: 0.75,
			watching: 'vm-anim'
		}, options);

		var item = this;

		function init() {
			$(item).each(function() {
				var animStart = $(window).height() * options.percent;
				var top = $(window).scrollTop();
				if (top > ($(this).offset().top - animStart)) {
					$(this).removeClass(options.watching).addClass('vm-onscreen');
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

