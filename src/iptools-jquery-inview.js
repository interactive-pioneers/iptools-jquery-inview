;(function($, window) {

  'use strict';

  var noop = function() {};

  var pluginName = 'iptInView';
  var defaults = {
    throttle: 100,
    delay: 500,
    inViewClass: 'in-viewport',
    allInViewClass: 'all-in-viewport',
    triggerEvents: false,
    eventNamespace: pluginName,
    onAppear: noop,
    onAppeared: noop,
    onFirstAppear: noop,
    onFirstAppeared: noop,
    onDisappear: noop,
    onDisappeared: noop
  };

  /**
   * IPTInView
   * @constructor
   * @param {object} element - jQuery element
   * @param {object} options - plugin options
   */
  function IPTInView(element, options) {
    this.element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  IPTInView.prototype = {

    init: function() {

      this.window = $(window);

      this.update();

      this.lastScroll = 0;

      if (this.inView) {
        this.executeWithDelay(this.settings.onAppear, 'onAppear');
        this.executeWithDelay(this.settings.onFirstAppear, 'onFirstAppear');
      }

      if (this.allInView) {
        this.executeWithDelay(this.settings.onAppeared, 'onAppeared');
        this.executeWithDelay(this.settings.onFirstAppeared, 'onFirstAppeared');
      }

      this.appearCount = this.inView ? 1 : 0;
      this.appearedCount = this.allInView ? 1 : 0;

      this.addEventListeners();

    },

    /**
     * update viewport and element position
     * @returns {undefined}
     */
    update: function() {

      this.viewport = this.getViewport();
      this.elementBounds = this.getElementBounds();
      this.inView = this.isInView();
      this.allInView = this.isAllInView();
      this.toggleClasses();

    },

    /**
     * get the viewport dimensions
     * @returns {object} viewport
     */
    getViewport: function() {

      var viewport = {
        top: this.window.scrollTop(),
        left: this.window.scrollLeft()
      };
      viewport.right = viewport.left + this.window.width();
      viewport.bottom = viewport.top + this.window.height();

      return viewport;

    },

    /**
     * get element position and dimensions
     * @returns {object} bounds
     */
    getElementBounds: function() {

      var bounds = this.element.offset();
      bounds.right = bounds.left + this.element.outerWidth();
      bounds.bottom = bounds.top + this.element.outerHeight();

      return bounds;

    },

    /**
     * checks weather or not element is (at least partially) in current viewport
     * @returns {boolean}
     */
    isInView: function() {

      var isOutofViewTop = this.viewport.top > this.elementBounds.bottom;
      var isOutofViewBottom = this.viewport.bottom < this.elementBounds.top;
      var isOutOfViewRight = this.viewport.right < this.elementBounds.left;
      var isOutOfViewLeft = this.viewport.left > this.elementBounds.right;
      return (!(isOutofViewTop || isOutofViewBottom || isOutOfViewRight || isOutOfViewLeft));

    },

    /**
     * checks weather or not element is completely in current viewport
     * @returns {boolean}
     */
    isAllInView: function() {

      var isInViewTop = this.viewport.top <= this.elementBounds.top;
      var isInViewBottom = this.viewport.bottom >= this.elementBounds.bottom;
      var isInViewRight = this.viewport.right >= this.elementBounds.right;
      var isInViewLeft = this.viewport.left <= this.elementBounds.left;
      return (isInViewTop && isInViewBottom && isInViewRight && isInViewLeft);

    },

    /**
     * add / remove inView and allInView classes
     * @returns {undefined}
     */
    toggleClasses: function() {

      if (this.inView) {
        this.element.addClass(this.settings.inViewClass);
      } else {
        this.element.removeClass(this.settings.inViewClass);
      }

      if (this.allInView) {
        this.element.addClass(this.settings.allInViewClass);
      } else {
        this.element.removeClass(this.settings.allInViewClass);
      }

    },

    /**
     * execute a function with delay
     * @param {function} fn - function to be executed
     * @param {string} trigger - trigger
     * @returns {undefined}
     */
    executeWithDelay: function(fn, trigger) {
      var self = this;
      if (self.settings.delay > 0) {
        setTimeout(
          function() {
            fn(self);
            if (self.settings.triggerEvents) {
              self.element.trigger(trigger + '.' + self.settings.eventNamespace);
            }
          },
          self.settings.delay
        );
      } else {
        fn.call(self);
      }

    },

    /**
     * handles scroll event
     * @param {event} event - jQuery event
     * @returns {undefined}
     */
    handleScroll: function(event) {

      var self = event.data;

      var now = Date.now();
      if (now - self.lastScroll > self.settings.throttle) {

        var beforeScroll = {
          inView: self.inView,
          allInView: self.allInView
        };

        self.update();

        if (!beforeScroll.inView && self.inView) {
          self.executeWithDelay(self.settings.onAppear, 'onAppear');
          if (self.appearCount === 0) {
            self.executeWithDelay(self.settings.onFirstAppear, 'onFirstAppear');
          }
          self.appearCount++;
        }

        if (!beforeScroll.allInView && self.allInView) {
          self.executeWithDelay(self.settings.onAppeared, 'onAppeared');
          if (self.appearedCount === 0) {
            self.executeWithDelay(self.settings.onFirstAppeared, 'onFirstAppeared');
          }
          self.appearedCount++;
        }

        if (beforeScroll.allInView && !self.allInView) {
          self.executeWithDelay(self.settings.onDisappear, 'onDisappear');
        }

        if (beforeScroll.inView && !self.inView) {
          self.executeWithDelay(self.settings.onDisappeared, 'onDisappeared');
        }

        self.lastScroll = now;

      }

    },

    /**
     * adds event handlers
     * @returns {undefined}
     */
    addEventListeners: function() {
      this.window.on('scroll' + '.' + this._name, null, this, this.handleScroll);
    },

    destroy: function() {
      this.element.off('scroll' + '.' + this._name);
      this.element.removeData('plugin_' + pluginName);
    }

  };

  $.fn[pluginName] = function(options) {

    return this.each(function() {

      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new IPTInView(this, options));
      }

    });

  };

})(jQuery, window);
