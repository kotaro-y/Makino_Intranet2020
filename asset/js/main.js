'use strict';

$(function(){

  // メールホバー時開閉
  $('.contact-list a').hover(function(){
    $(this).find('.mail').removeClass('fa-envelope').addClass('fa-envelope-open');
    $(this).find('.teams').css('margin-right','5px').removeClass('fa-user-friends').addClass('fa-comment-dots');
  },function(){
    $(this).find('.mail').removeClass('fa-envelope-open').addClass('fa-envelope');
    $(this).find('.teams').css('margin-right','3px').removeClass('fa-comment-dots').addClass('fa-user-friends');
  });

  // スクロール時にナビ固定
  const headerPos = $('header').outerHeight();
  $(window).scroll(function(){
    if($('body, html').scrollTop() > headerPos){
      $('.global-nav').css({
        'position' : 'fixed',
        'z-index' : '10',
        'top' : '0',
        'left' : '50%',
        'transform' : 'translateX(-50%)',
        'margin' : '8px 0 10px 0',
        'background-color' : 'rgba(220,220,220, .7)',
      });
      $('.contact-list').css({
        'position' : 'fixed',
        'z-index' : '10',
        'top' : '0',
        'right' : '0',
        'background-color' : 'rgba(18,39,74, .6)',
        'height' : headerPos,
      });
    }else{
      $('.global-nav').css({
        'display' : '',
        'position' : '',
        'z-index' : '',
        'top' : '',
        'left' : '',
        'transform' : '',
        'margin' : '',
        'background-color' : '',
      });
      $('.contact-list').css({
        'display' : '',
        'position' : '',
        'z-index' : '',
        'top' : '',
        'right' : '',
        'background-color' : '',
        'height' : '',
      });
    }
  });

});