/*
* vmOnScreen() 2.0.0
*
* Copyright 2018
*
* By Dave Carney & John Finch, https://vehiclemedia.com/
* Scroll Watching plugin
* 
* 	activate with:
* 		$('SOME_ELEMENT').vmOnScreen();
*
* 	adds class:
* 		.vm-onscreen
*		Target that class to do whatever you need.
*
*	changing defaults:
*		the function is set to fire when the element is at 0.75 of the screen.
*		pass a different percentage to the percent: property to change this (example below)
*
*			$('.some-other-class').vmOnScreen({
*				percent: 0.5
*			});
*
*/

(function ( $ ) {
	$.fn.vmOnScreen = function(options) {

		options = $.extend({
			percent: 0.75
		}, options);

		var items = this;
		var animOffset = $(window).height() * options.percent;

		function buildAnimObjects() {
			items.each(function() {
				this.itemPos = $(this).offset().top - animOffset;
				this.watchDown = true;
			});
		}

		buildAnimObjects();

		var yPos = window.scrollY;
		
		function anim() {
			yPos = window.scrollY;
			items.each(function() {
				if (this.itemPos < yPos) {
					if (this.watchDown) {
						$(this).addClass('vm-onscreen');
						this.watchDown = false;			
					}
				}
			});
		}

		anim();

		var vmThrottle = 4;
		var scrollTimer;
		$(window).scroll(function() {
			// attempted Opera Mini workaround. force the animation after scrolling
			clearTimeout(scrollTimer);
			scrollTimer = setTimeout(function() {
				anim();
			}, 1000);
			vmThrottle++;
			if (vmThrottle === 5) {
				anim();
				vmThrottle = 0;
			}
		});

		var windowWidth = $(window).width();
		var resizeTimer;
		$(window).resize(function() {
			var posCache = $(window).scrollTop();
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function() {
				var newWindowWidth = $(window).width();
				if ((newWindowWidth !== windowWidth) ||
					($(window).scrollTop() === posCache)) {
					windowWidth = newWindowWidth;
					buildAnimObjects();
					anim();
				}
			}, 200);
		});

	};
}( jQuery ));

