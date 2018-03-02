# vmOnScreen #

## Scroll Watching Plugin ##

### Activate With ###

$('.vm-anim').vmOnScreen();

### Watches for elements with class: ###

.vm-anim

### Switches class: ###

.vm-anim to .vm-onscreen

Target those classes to do whatever you need.

```

.vm-anim {
    opacity: 0;
}

..vm-onscreen {
    transition: all 0.5s ease-in-out;
    opacity: 1;
}

```

### Changing defaults ###

The function is set to fire when the element is at 0.75 of the screen.
Pass a different percentage to the percent: property to change this.

You can overide the element to watch for by passing something else to the jQuery object,
but you must also pass that same element( without the . or # ) to the watching: property

### Changing defaults all wrapped up ###

```

$('.some-other-class').vmOnScreen({
    watching: 'some-other-class',
    percent: 0.5
});

```

* Use this approach if you want different elements to animate at different percentages

### Dependencies ###
jQuery 1.7
