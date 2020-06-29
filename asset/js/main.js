'use strict';

$(function(){
  // ページ表示時のエフェクト用
  setTimeout(() => {
  $('.starting').fadeOut(1300);
  }, 200);
  setTimeout(() => {
  $('.starting-page').fadeOut(650);
  }, 200);
  // ヘッダのコンタクト項目ホバー時アイコン変化
  $('.contact-list a').hover(function(){
    $(this).find('.mail').removeClass('fa-envelope').addClass('fa-envelope-open');
    $(this).find('.teams').css('margin-right','5px').removeClass('fa-user-friends').addClass('fa-comment-dots');
  },function(){
    $(this).find('.mail').removeClass('fa-envelope-open').addClass('fa-envelope');
    $(this).find('.teams').css('margin-right','3px').removeClass('fa-comment-dots').addClass('fa-user-friends');
  });

  // スクロール時にナビメニュー固定
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
        'background-color' : 'rgba(18,39,74, .7)',
      });
      $('.global-nav a').css(
        'color', '#fff'
      );
      $('.contact-list').css({
        'position' : 'fixed',
        'z-index' : '10',
        'top' : '0',
        'right' : '0',
        'background-color' : 'rgba(18,39,74, .7)',
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
      $('.global-nav a').css(
        'color', ''
      );
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

    // メインビジュアルのスライドショー
    const slideCount = $('.slides li').length;
    let currentSlide = 1;
    let nextSlide = 2;
    const interval = 3800;
    const duration = 700;
    let timer;
    $('.slides li:not(:first-child)').hide();
    function slideTimer(){
      $('.slides li:nth-child('+currentSlide+')').fadeOut(duration);
      $('.slides li:nth-child('+nextSlide+')').fadeIn(duration);
      currentSlide = nextSlide;
      nextSlide = ++nextSlide;
      if(nextSlide > slideCount){
        nextSlide = 1;
      }
      $('.visual-select ul li').removeClass('selected');
      $('.visual-select ul li:nth-child('+currentSlide+')').addClass('selected');
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
      nextSlide = $(this).html();
      clearInterval(timer);
      timer = setInterval(slideTimer,interval);
      slideTimer();
      return false;
    });
    
    // コンテンツの下部分ぼかしの制御
    $('.section-desc').scroll(function(){
      if($(this).scrollTop() > 0){
        $(this).addClass('no-blur');
      }else{
        $(this).removeClass('no-blur');
      }
    });
});