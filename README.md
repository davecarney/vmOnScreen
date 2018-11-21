# vmOnScreen v2.2.0 #

## Scroll Watching Plugin ##

### Activate With ###

$(document).vmOnScreen();

### Adds class: ###

.vm-onscreen

Target that class to do whatever you need.

```

SOME_ELEMENT {
    opacity: 0;
}

SOME_ELEMENT.vm-onscreen {
    transition: all 0.5s ease-in-out;
    opacity: 1;
}

```

### Changing defaults ###

* The function is set to fire when .vm-anim is at 0.75 of the screen.
* Pass an array of objects with parameters to the plugin to change the defaults.
* Each object being a value of the array like so:

```

$(document).vmOnScreen([
	{
		element: $('SOME_OTHER_ELEMENT'),
		percent: 0.5
	},
	{
		element: $('SOME_STICKY_ELEMENT'),
		sticky: true,
		threshold: {
			up: 10,
			down: 20
		}
	}
]);

```

### Default settings ###

```
element: $('.vm-anim'),
percent: 0.75,
sticky: false,
stickyClass: 'sticky-vis',
threshold: {
	up: 5,
	down: 10
}
```

### Sticky Show/Hide ###

* The plugin has "scroll down and hide", "scroll up and show" sticky header capability.
* The "threshold" values are how many scrolls it takes to activate the show/hide.
* You need to set both "up" and "down" if you are wanting to adjust those values.

### Dependencies ###
jQuery 1.7
