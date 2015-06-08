'use strict';
/* jshint undef: false */
(function() {
  describe('iptInView', function() {

    var config = {
      delay: 1000
    };

    var pluginName = 'plugin_iptInView';
    var object = null;

    var $element = $('<div/>', {
      class: 'element',
      style: 'position: absolute; top: 1000px; left: 200px; width: 100px; height: 100px;'
    }).appendTo('body');

    var $window = $(window);
    $window.width(1024).height(768);

    describe('init', function() {

      beforeEach(function() {
        object = $element.iptInView(config);
      });

      it('expected to construct object', function() {
        return expect(object).to.be.an.object;
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
        return expect(object.data(pluginName).getViewport).to.be.an.object;
      });

    });

    describe('isInView', function() {

      beforeEach(function() {
        object = $element.iptInView(config);
      });

      it('expected to return false (element is not in viewport)', function() {
        return expect(object.data(pluginName).isInView).to.not.be.ok;
      });

      it('expected to return true (element is in viewport)', function() {
        $window.scrollTop(300);
        return expect(object.data(pluginName).isInView).to.be.ok;
      });

    });

  });
})();
