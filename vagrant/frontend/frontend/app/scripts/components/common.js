(function (jQuery, document, window) {
  'use strict';

  /**
   * component common
   * @type {{}}
   */
  SR.components.common = {};

  /**
   * init
   */
  SR.components.common.init = function () {
    SR.components.common.ajaxStop(function () {
      console.log('ajaxstop testing common');
    });
  };

  /**
   * ajax stop
   * @param element
   * @param callback
   */
  SR.components.common.ajaxStop = function (callback) {
    if (callback instanceof Object) {
      $(document).ajaxStop(callback());
    }
  };

  /**
   * get vars for url
   * @param url
   * @returns {*}
   */
  SR.components.common.getVars = function (url) {
    if (url && typeof url !== 'string') return false;

    var vars = {};

    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      vars[key] = value;
    });

    return vars;
  };

  /**
   * scroll element
   * @param query
   * @param callback
   * @returns {boolean}
   */
  SR.components.common.onScrollElement = function(element, callback) {
    if(!element instanceof Object || element.length == 0 || typeof callback !== 'function')
      return false;

    element.onscroll = function () { callback(); };
  };

  /**
   * scroll on windows
   * @param callback
   * @returns {boolean}
   */
  SR.components.common.onScrollWindows = function (callback) {
    if (!callback || typeof callback !== 'function')
      return false;

    window.addEventListener('scroll', function () {
      callback();
    });
  };

  /**
   * callback
   * @param callback
   */
  SR.components.common.resize = function (callback) {
    if (!callback || typeof callback !== 'function')
      return false;

    window.addEventListener('resize', function () {
      callback();
    });
  };
})($, document, window);
