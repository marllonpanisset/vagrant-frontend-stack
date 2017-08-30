(function(document, window) {
  'use strict';

  /**
   * SR
   * @type {{}}
   */
  var SR = window.SR = window.SR || {};

  /**
   * init
   */
  SR.init = function() {
    if(window.SR instanceof Object) {
      SR.components = {};
      SR.layouts = {};

      document.addEventListener('readystatechange', SR.DOMReady, false);
    } else {
      console.err('Error loaded page!');
    }
  };

  /**
   * DOM Ready
   * @param state
   * @returns {boolean}
   * @constructor
   */
  SR.DOMReady = function (event) {
    if (event.target.readyState === 'complete') {
      SR.layoutInit(SR.layouts);
    } else if(event.target.readyState === 'interactive') {
      console.log('loading...');
    } else {
      console.log('e: ', event.target.readyState);
    }
  };

  /**
   * layout init
   * @param layouts
   * @returns {boolean}
   */
  SR.layoutInit = function (layouts) {
    if(!layouts) return false;

    for(var i = 0; i < Object.getOwnPropertyNames(layouts).length; i++) {
      var item = Object.getOwnPropertyNames(layouts)[i];

      if(layouts[item].hasOwnProperty('init'))
        layouts[item].init();
    }
  };

  //init
  SR.init();
})(document, window);