/*jslint browser: true*/
/*global console, Framework7, alert, Dom7*/

/**
 * A plugin for Framework7 to show black little toasts
 *
 * @author www.timo-ernst.net
 * @license MIT
 */
Framework7.prototype.plugins.toast = function (app, globalPluginParams) {
  'use strict';
  
  var Toast = function (text, iconhtml, options) {
    var self = this,
        $$ = Dom7,
        $box,
        $main;

    var callback;

    this.onDissMissListener = function(b){
      callback = b;
    };

    function hideBox($curbox) {
      if ($curbox) {
        $$('.toast-container').removeClass('fadein').transitionEnd(function () {
          $curbox.remove();

          if(callback != null)
          {
            callback();
          }

        });
      }
    }

    function isString(obj) {
      return toString.call(obj) === '[object String]';
    }
    
    this.show = function (message) {
      var clientLeft,
          $curbox,
          html = [];
      
      // Remove old toasts first if there are still any
      $$('.toast-container').off('click').off('transitionEnd').remove();
      $box = $$('<div class="toast-main">');

      html.push(
          '<div class="toast-container show">'
      );

      // Add content
      if (isString(iconhtml) && iconhtml.length > 0) {
        html.push(
          '<div class="toast-icon">' + 
            iconhtml + 
          '</div>'
        );
      }

      if (isString(message) && message.length > 0) {
        text = message;
      }

      if (isString(text) && text.length > 0) {
        html.push(
          '<div class="toast-msg">' + 
            text + 
          '</div>'
        );
      }

      html.push(
          '</div>'
      );

      $box.html(
        html.join('')
      );

      $$('body').append($box);

      // Hide box on click
      $box.click(function () {
        hideBox($box);
      });

      // Fade in toast
      $$('.toast-container').addClass('fadein');

      // Automatically hide box after few seconds
      $curbox = $box;
      setTimeout(function () {
        hideBox($curbox);
      }, 1500);
    };

    this.hide = function() {
      hideBox($box);
    };
    
    return this;
  };
  
  app.toast = function (text, iconhtml, options) {
    return new Toast(text, iconhtml, options);
  };
};