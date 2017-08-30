(function(jQuery, document, window) {
  'use strict';

  /**
   * content
   * @type {{}}
   */
  SR.layouts.content = {};


  //Scroll animado.
  SR.layouts.dataScroll = function() {
    $('[data-scroll]').click(function(event){
      event.preventDefault();
      var $this = $(this),
        scroll = $this.data('scroll');
      if ($(scroll).length > 0) {
        var top = $(scroll).offset().top;
        $('html,body').animate({
          scrollTop: top
        }, 1000)  
      }
    });
  };


  /**
   * init
   */
  SR.layouts.content.init = function () {
    SR.layouts.dataScroll();
    SR.components.selectComponent.init('.');
    console.log(SR.components.common.getVars(window.location.href));
  };
})($, document, window);
