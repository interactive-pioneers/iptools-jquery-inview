'use strict';
/* jshint undef: false */
(function() {
  describe('iptInView', function() {

    var config = {
      throttle: 0,
      delay: 1000
    };

    var pluginName = 'plugin_iptInView';
    var object = null;

    var $element = $('<div/>', {
      class: 'element',
      style: 'position: absolute; top: 0; left: 50%; width: 100px; height: 100px; background-color: #000;'
    }).appendTo('body');

    window.resizeTo(1024, 768);

    describe('init', function() {

      beforeEach(function() {
        object = $element.iptInView(config);
      });

      it('expected to construct object', function() {
        return expect(object).to.be.an.object;
      });

      it('expected to set throttle to ' + config.throttle, function() {
        return expect(object.data(pluginName).settings.throttle).to.equal(config.throttle);
      });

      it('expected to set delay to ' + config.delay, function() {
        return expect(object.data(pluginName).settings.delay).to.equal(config.delay);
      });

    });

    describe('getViewport', function() {

      beforeEach(function() {
        object = $element.iptInView(config);
      });

      it('expected object to be returned', function() {
        return expect(object.data(pluginName).getViewport()).to.be.an.object;
      });

    });

    describe('isInView', function() {

      beforeEach(function() {
        object = $element.iptInView(config);
      });

      it('expected to return true (element is in viewport)', function() {
        return expect(object.data(pluginName).isInView()).to.be.ok;
      });

    });

  });
})();
