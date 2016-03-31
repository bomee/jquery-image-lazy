// ***************************************************************
// jQuery plugin for ImagePreLoader
// author:  bomee  
// date:  2016/3/30
// version: 1.1
// ***************************************************************
!(function(window, $) {
  $.fn.imageLazy = function() {
    var $win = $(window), 
        $remainEles = this;

    function imageLazy() {
      var $visibleEles = $remainEles.filter(function() {
        var $e = $(this);
        if ($e.is(":hidden")) return;
        if (!$e.hasClass($.fn.imageLazy.defaults.scrollLazyClass)) return true;
        var wt = $win.scrollTop(),
            wb = wt + $win.height(),
            et = $e.offset().top,
            eb = et + $e.height();

        return eb >= wt && et <= wb;
      });
      
      $remainEles = $remainEles.not($visibleEles.trigger("download.imageLazy"));

      if(!$remainEles.length){
        $win.off("scroll.imageLazy resize.imageLazy");
      }
    }

    this.one("download.imageLazy", function() {
      new ImagePreLoader(this).load();
    });

    $win.on("scroll.imageLazy resize.imageLazy", imageLazy);
    imageLazy();
    
    return this;
  };

  $.fn.imageLazy.defaults = {
    autoInit        : true,
    scrollLazyClass : "image-lazy-scroll"
  };

  if($.fn.imageLazy.defaults.autoInit){
    $(function(){
      $('.image-lazy').imageLazy();
    });
  }
})(window, window.jQuery);