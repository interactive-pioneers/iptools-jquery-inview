# iptools-jquery-inview [![Build Status](http://img.shields.io/travis/interactive-pioneers/iptools-jquery-inview.svg)](https://travis-ci.org/interactive-pioneers/iptools-jquery-inview)

Viewport Monitoring Plugin

## Features

Detect if element is in viewport and call events on enter and exit.

## Requirements

- jQuery >=1.11.3 <4.0.0

## Example with callbacks

```html
<div class="element"></div>

<script src="src/iptools-jquery-inview.js"></script>
<script type="text/javascript">
  $(document).ready(function() {
    $('.element').iptInView({
      throttle: 100, // throttles scroll event
      delay: 500, // delay until the below event functions are fired
      inViewClass: 'in-viewport',
      allInViewClass: 'all-in-viewport',
      onAppear: function() {
        alert('Element enters viewport.');
      },
      onAppeared: function() {
        alert('Element fully entered viewport.');
      },
      onFirstAppear: function() {
        alert('Element enters viewport for the first time.');
      },
      onFirstAppeared: function() {
        alert('Element fully entered viewport for the first time.');
      },
      onDisappear: function() {
        alert('Element starts leaving the viewport.');
      },
      onDisappeared: function() {
        alert('Element no longer in viewport.');
      }
    });
  });
</script>
```

## Example with event listeners

```html
<div class="element"></div>

<script src="src/iptools-jquery-inview.js"></script>
<script type="text/javascript">
  $(document).ready(function() {
    function onAppear(event) {
      alert('Element enters viewport.');
    }
    function onAppeared(event) {
      alert('Element fully entered viewport.');
    }
    function onFirstAppear(event) {
      alert('Element enters viewport for the first time.');
    }
    function onFirstAppeared(event) {
      alert('Element fully entered viewport for the first time.');
    }
    function onDisappear(event) {
      alert('Element starts leaving the viewport.');
    }
    function onDisappeared(event) {
      alert('Element no longer in viewport.');
    }
    $('.element')
      .iptInView({
        triggerEvents: true,
        eventNamespace: 'customEventNamespace',
      })
      .on('onAppear.customEventNamespace', onAppear)
      .on('onAppeared.customEventNamespace', onAppeared)
      .on('onFirstAppear.customEventNamespace', onFirstAppear)
      .on('onFirstAppeared.customEventNamespace', onFirstAppeared)
      .on('onDisappeared.customEventNamespace', onDisappeared);
  });
</script>
```

## Licence
Copyright © 2015-2017 Interactive Pioneers GmbH. Licenced under [GPL-3](LICENSE).
