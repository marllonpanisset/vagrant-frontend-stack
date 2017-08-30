(function(jQuery, document) {
  'use strict';

  /**
   * select
   * @type {{}}
   */
  SR.components.selectComponent = {};

  /**
   * init
   * @param className
   * @returns {boolean}
   */
  SR.components.selectComponent.init = function(className) {
    if(!className || typeof className != 'string')
      return false;

    SR.components.common.ajaxStop(function () { console.log('testing ajaxstop'); } );
    SR.components.common.onScrollElement(document.querySelector('body'), function () { console.log('testing scroll'); });
    SR.components.common.resize(function() { console.log('testing resize'); });
  };
})($, document);
