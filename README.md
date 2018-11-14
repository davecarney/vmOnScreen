# vmOnScreen v2.0.0 #

## Scroll Watching Plugin ##

### Activate With ###

$('SOME_ELEMENT').vmOnScreen();

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

The function is set to fire when the element is at 0.75 of the screen.
Pass a different percentage to the percent: property to change this.

```

$('.some-other-class').vmOnScreen({
    percent: 0.5
});

```

### Dependencies ###
jQuery 1.7
