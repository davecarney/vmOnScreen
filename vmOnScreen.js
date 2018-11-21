/*
* vmOnScreen() 2.2.0
*
* Copyright 2018
*
* By Dave Carney & John Finch, https://vehiclemedia.com/
* Scroll Watching plugin
* 
* 	activate with:
* 		$(document).vmOnScreen();
*
* 	looks for: .vm-anim
*	adds class: .vm-onscreen
*		Target that class to do whatever you need.
*
*	changing defaults:
*		the function is set to fire when the .vm-anim is at 0.75 of the screen.
*		pass an array of objects with parameters to the plugin to change the defaults.
*		check the defaults var below for changable settings.
*		Each object being a value of the array like so:
*
*			$(document).vmOnScreen([
*				{
*					element: $('SOME_OTHER_ELEMENT'),
*					percent: 0.5
*				},
*				{
*					element: $('SOME_STICKY_ELEMENT'),
*					sticky: true
*				}
*			]);
*
*	Sticky header:
*		the plugin has "scroll down and hide", "scroll up and show" sticky header capability.
*		the "threshold" values are how many scrolls it takes to activate the show/hide.
*		you need to set both "up" and "down" if you are wanting to adjust those values.
*/

(function ( $ ) {
	$.fn.vmOnScreen = function(options) {

		function iOSversion() {
			if (/iP(hone|od|ad)/.test(navigator.platform)) {
				var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
				return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
			}
		}

		var appleDevice = iOSversion();
		var oldAppleDevice = false;

		if (appleDevice != undefined && appleDevice[0] < 11) { 
			oldAppleDevice = true;
		}

		var defaults = {
			element: $('.vm-anim'),
			percent: 0.75,
			sticky: false,
			stickyClass: 'sticky-vis',
			threshold: {
				up: 5,
				down: 10
			}
		}

		// merge element settings with defaults
		var itemSettings = [];
		if (!options) { options = $(defaults).toArray(); }
		options.forEach(function(values) {
			itemSettings.push($.extend({}, defaults, values));
		});

		// create objects for all the instances of the elements on the page
		var items = [];
		itemSettings.forEach(function(value) {
			var settings = {};
			settings.percent = value.percent;
			settings.sticky = value.sticky;
			settings.stickyClass = value.stickyClass;
			settings.threshold = value.threshold;
			value.element.each(function() {
				items.push($.extend({}, settings, $(this)));
			});
		});

		var windowHeight = $(window).height();
		var stickyItem = false;

		// cache the y position of the elements on the page
		function buildAnimObjects() {
			items.forEach(function(element) {
				element.itemPos = $(element[0]).offset().top - (windowHeight * element.percent);
				element.watchDown = true;
				if (element.sticky) {
					stickyItem = element;
				}
			});
		}

		buildAnimObjects();

		var yPos, oldPos = window.scrollY;
		
		// check scroll position against array of cached element positions
		function anim() {
			yPos = window.scrollY;
			items.forEach(function(element) {
				if (element.itemPos < yPos) {
					if (element.watchDown) {
						$(element[0]).addClass('vm-onscreen');
						element.watchDown = false;			
					}
				}
			});
		}

		// iOS pre 12 doesn't like the new implementation of the plugin.
		function oldAnim() {
			yPos = window.scrollY;
			items.forEach(function(element) {
				var animStart = $(window).height() * element.percent;
				var top = $(window).scrollTop();
				if (top > ($(element[0]).offset().top - animStart)) {
					if (element.watchDown) {
						$(element[0]).addClass('vm-onscreen');
						element.watchDown = false;
					}
				}
			});
		}

		var downScroll = 0;
		var upScroll = 0;
		var watchDownSticky = true;
		var watchUpSticky = true;

		// Sticky nav functions
		function stickyHeader(item) {
			if (oldPos < yPos) {
				oldPos = yPos;
				downScroll++;
				upScroll = 0;
				if (watchDownSticky) {
					if (downScroll > item.threshold.down) {
						watchDownSticky = false;
						watchUpSticky = true;
						downScroll = 0;
						$(item[0]).removeClass(item.stickyClass);
					}
				}
			} else {
				oldPos = yPos;
				upScroll++;
				downScroll = 0;
				if (watchUpSticky) {
					if (upScroll > item.threshold.up) {
						watchUpSticky = false;
						watchDownSticky = true;
						upScroll = 0;
						$(item[0]).addClass(item.stickyClass);
					}
				}
			}
		}

		var vmThrottle = 4;

		// set the scroll event handlers based off of what elements are present
		function scrollHandler() {
			if (stickyItem) {
				if (oldAppleDevice) {
					oldAnim();
					$(window).scroll(function() {
						vmThrottle++;
						if (vmThrottle === 5) {
							oldAnim();
							stickyHeader(stickyItem);
							vmThrottle = 0;
						}
					});
				} else {
					anim();
					$(window).scroll(function() {
						vmThrottle++;
						if (vmThrottle === 5) {
							anim();
							stickyHeader(stickyItem);
							vmThrottle = 0;
						}
					});
				}
			} else {
				if (oldAppleDevice) {
					oldAnim();
					$(window).scroll(function() {
						vmThrottle++;
						if (vmThrottle === 5) {
							oldAnim();
							vmThrottle = 0;
						}
					});
				} else {
					anim();
					$(window).scroll(function() {
						vmThrottle++;
						if (vmThrottle === 5) {
							anim();
							vmThrottle = 0;
						}
					});
				}
			}
		}

		scrollHandler();

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
					(oldAppleDevice) ? oldAnim : anim();
				}
			}, 200);
		});

	};
}( jQuery ));

