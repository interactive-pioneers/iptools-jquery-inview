'use strict';

/* global expect */

(function() {
  describe('iptInView', function() {

    var config = {
      throttle: 0,
      delay: 1000
    };

    var pluginName = 'plugin_iptInView';
    var object = null;
    var selector = '.element';

    describe('init', function() {

      beforeEach(function() {
        object = $(selector).iptInView(config);
      });

      afterEach(function() {
        object.data(pluginName).destroy();
      });

      it('expected to construct object', function() {
        console.log('object is ', object.data(pluginName));
        return expect(object.data(pluginName)).to.be.an.object;
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
        object = $(selector).iptInView(config);
      });

      afterEach(function() {
        object.data(pluginName).destroy();
      });

      it('expected object to be returned', function() {
        return expect(object.data(pluginName).getViewport()).to.be.an.object;
      });

    });

    xdescribe('isInView', function() {

      beforeEach(function() {
        object = $(selector).iptInView(config);
      });

      it('expected to return true (element is in viewport)', function() {
        return expect(object.data(pluginName).isInView()).to.be.ok;
      });

    });

  });
})();
