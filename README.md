# iptools-jquery-inview [![Build Status](http://img.shields.io/travis/interactive-pioneers/iptools-jquery-inview.svg)](https://travis-ci.org/interactive-pioneers/iptools-jquery-inview)

Viewport Monitoring Plugin

## Features

Detect if element is in viewport and call events on enter and exit.

## Requirements

- jQuery 1.11.3 or greater

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

## Contributions

### Bug reports, suggestions

- File all your issues, feature requests [here](https://github.com/interactive-pioneers/iptools-jquery-inview/issues)
- If filing a bug report, follow the convention of _Steps to reproduce_ / _What happens?_ / _What should happen?_
- __If you're a developer, write a failing test instead of a bug report__ and send a Pull Request

### Code

1. Fork it ( https://github.com/[my-github-username]/iptools-jquery-inview/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Develop your feature by concepts of [TDD](http://en.wikipedia.org/wiki/Test-driven_development), see [Tips](#tips)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

### Tips

Following tasks are there to help with development:

- `grunt watch:bdd` listens to tests and source, reruns tests
- `grunt qa` run QA task that includes tests and JSHint
- `grunt build` minify source to dist/

## Licence
Copyright © 2015 Interactive Pioneers GmbH. Licenced under [GPLv3](LICENSE).