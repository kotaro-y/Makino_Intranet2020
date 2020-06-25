'use strict';

$(function(){

  // コンタクト項目ホバー時変化
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

    // スライドショー
    const count = $('.slides li').length;
    let current = 1;
    let next = 2;
    const interval = 3800;
    const duration = 700;
    let timer;
    $('.slides li:not(:first-child)').hide();
    function slideTimer(){
      $('.slides li:nth-child('+current+')').fadeOut(duration);
      $('.slides li:nth-child('+next+')').fadeIn(duration);
      current = next;
      next = ++next;
      if(next > count){
        next = 1;
      }
      $('.visual-select ul li').removeClass('selected');
      $('.visual-select ul li:nth-child('+current+')').addClass('selected');
    }
    timer = setInterval(slideTimer,interval);
  
    $(window).blur(function(){
      clearInterval(timer);
    });
    $(window).focus(function(){
      clearInterval(timer);
      timer = setInterval(slideTimer,interval);
    });
    $('.visual-select ul li').click(function(){
      next = $(this).html();
      clearInterval(timer);
      timer = setInterval(slideTimer,interval);
      slideTimer();
      return false;
    });

});