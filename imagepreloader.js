// ***************************************************************
// ImagePreLoader.
// Compatible with the retina screen and ordinary screen for the same <img>
// author:  bomee  
// date:  2016/3/30
// version: 1.1
// ***************************************************************
!(function(window){
  // ImagePreLoader can use anywhere without jQuery.
  var ImagePreLoader = window['ImagePreLoader'] = function(ele, opts){
    this.ele = ele;
    this.opts = opts || {};
  };

  // defaults for ImagePreLoader
  ImagePreLoader.defaults = {
    loadingClass    : "image-lazy-loading",
    successClass    : "image-lazy-success",
    errorClass      : "image-lazy-error"
  };

  // process element's class, its intention is to remove repeat code.
  function processClass(ele, className, processFn){
    var eleClass = (' ' + ele.className + ' ').replace(/[\t\r\n\f]/g, ' ');
    var classArray = className.split(/ +/);
    for(var i = classArray.length, clazz; i >=0; i--){
      clazz = classArray[i];
      if(!clazz) continue;

      eleClass = processFn(eleClass, clazz);
    }
    eleClass = eleClass.replace(/^ +| +$/g, '');
    if(eleClass != ele.className){
      ele.className = eleClass;
    }
  }

  // private method for ImagePreLoader. 
  var _private = {
    addClass: (function() {
      function processFn(eleClass, clazz){
        return eleClass.indexOf(' ' + clazz + ' ') < 0 ? eleClass + clazz + ' ' : eleClass;
      }
      return function(ele, className) {
        processClass(ele, className, processFn);
      }
    })(),
    removeClass: (function(ele, className){
      function processFn(eleClass, clazz){
        while (eleClass.indexOf(' ' + clazz + ' ') > -1) {
          eleClass = eleClass.replace(' ' + clazz + ' ', '');
        }
        return eleClass;
      }
      return function(ele, className) {
        processClass(ele, className, processFn);
      }
    })(),
    done: function(loader){
      _private.removeClass(loader.ele, ImagePreLoader.defaults.loadingClass);
      _private.addClass(loader.ele, ImagePreLoader.defaults.successClass);
      loader.ele.setAttribute('src', loader.getUrl());
      loader.opts.done && loader.opts.done.call(loader); 
    },
    error: function(loader){
      _private.removeClass(loader.ele, ImagePreLoader.defaults.loadingClass);
      _private.addClass(loader.ele, ImagePreLoader.defaults.errorClass);
      loader.opts.error && loader.opts.error.call(loader);
    }
  };
  
  // prototype method
  ImagePreLoader.prototype.getUrl = function(){
    return window.devicePixelRatio > 1 
      ? this.ele.getAttribute('data-src-retina') || this.ele.getAttribute('data-src') 
      : this.ele.getAttribute('data-src');
  }

  ImagePreLoader.prototype.load = function(){
    _private.addClass(this.ele, ImagePreLoader.defaults.loadingClass);
    var img = new Image();
    img.src = this.getUrl();
    var that = this;
    if (img.complete) {
      _private.done.call(that, that);
      return;
    }

    img.onload = function () {
      _private.done.call(that, that);
    };

    img.onerror = function(){
      _private.error.call(that, that);
    }
  };
})(window);