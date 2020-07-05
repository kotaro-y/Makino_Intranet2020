'use strict';

const mobileWidth = 600; //スマホのメディアクエリ横幅指定

$(function(){
  // ページ表示時のエフェクト用
  setTimeout(() => {
  $('.starting').fadeOut(1300);   //トップページ
  }, 200);
  setTimeout(() => {
  $('.starting-page').fadeOut(650);    //個別ページ
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
    if($(window).innerWidth() > mobileWidth){   //スマホ環境では動作させない
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
        $('.dark-mode .global-nav').css({
          'background-color' : '#000',
        });
        $('.contact-list').css({
          'position' : 'fixed',
          'z-index' : '10',
          'top' : '0',
          'right' : '0',
          'background-color' : 'rgba(18,39,74, .7)',
          'height' : headerPos,
        });
        $('.dark-mode .contact-list').css({
          'background-color' : '#000',
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

    // コンテンツホバー時に日本語表示
    const linkTextJpn = ['メンバー紹介', '規則･規定', '人事制度', '研修', '各種フォーム', 'その他情報'];
    const linkTextEng = ['Member', 'Rules', 'HR System', 'Learning', 'Forms', 'Others'];
    $('.section-img > a').each(function(index){
      $(this).hover(function(){
        if($('#eng-check').hasClass('no-display')){   //Englishモードになっていない場合の処理
          $(this).append(`<p>${linkTextJpn[index]}</p>`);
          $(this).find('p').addClass('link-text').hide();
          $(this).find('p').fadeIn(800);
        }else{
          $(this).append(`<p>${linkTextEng[index]}</p>`);
          $(this).find('p').addClass('link-text').hide();
          $(this).find('p').fadeIn(800);
        }
      },function(){
        $(this).find('p').remove();
      });
    });
});



document.addEventListener('DOMContentLoaded',function(){
  // ダークモード切替(bodyにdark-modeクラスを付け外しし制御。切替状態はCookie保存する)
  const darkModeBtn = document.getElementById('btn-mode');
  const darkModeSelect = Cookies.get('darkModeOn');

  if(darkModeSelect === 'on'){                /*Cookieで取得した値がonの場合ダークモードにする*/
    darkModeBtn.checked = true;
  } else{
    darkModeBtn.checked = false;
  }
  if(darkModeBtn.checked === true){
    document.body.classList.add('dark-mode');
  }
  
  darkModeBtn.addEventListener('change',function(){
    if(darkModeBtn.checked === true){
      $(function(){                           /*ページ遷移時と同じエフェクトを、色を変えて使用(jQuery)*/
        $('.starting').css('background-color','rgba(0,0,0)').show();
        $('.starting-page').css('background-color','rgba(0,0,0)').show();
      });
      document.body.classList.add('dark-mode');
      Cookies.set('darkModeOn','on',{expires:1/48});
    }else{
      $(function(){
        $('.starting').css('background-color','#fff').show();
        $('.starting-page').css('background-color','#fff').show();
      });
      document.body.classList.remove('dark-mode');
      Cookies.remove('darkModeOn');
    }
    $(function(){
      $('.starting').fadeOut(600);
      $('.starting-page').fadeOut(600);
    });
  })
  
  //日⇔英切替(no-display クラスで表示を制御する。切替状態はCookie保存する)
  const langSwitchBtn = document.getElementById('btn-lang');
  const EngSelect = Cookies.get('EngOn');
  const JpnText = document.querySelectorAll('.ja');
  const EngText = document.querySelectorAll('.en');
  
  if(EngSelect === 'on'){             /*Cookieで取得した値がonの場合英字表記にする*/
    langSwitchBtn.checked = true;
  }else{
    langSwitchBtn.checked = false;
  }
  if(langSwitchBtn.checked === true){
    JpnText.forEach(function(jaText){
      jaText.classList.add('no-display');
    });
    EngText.forEach(function(enText){
      enText.classList.remove('no-display');
    });
  }
  
  langSwitchBtn.addEventListener('change',function(){
    $(function(){                 /*ページ遷移時と同じエフェクトを使用(jQuery)*/
      $('.starting').show();
      $('.starting-page').show();
    });
    if(langSwitchBtn.checked === true){
      JpnText.forEach(function(jaText){
        jaText.classList.add('no-display');
      });
      EngText.forEach(function(enText){
        enText.classList.remove('no-display');
      });
      Cookies.set('EngOn','on');
    }else{
      JpnText.forEach(function(jaText){
        jaText.classList.remove('no-display');
      });
      EngText.forEach(function(enText){
        enText.classList.add('no-display');
      });
      Cookies.remove('EngOn');
    }
    $(function(){
      $('.starting').fadeOut(600);
      $('.starting-page').fadeOut(600);
    });
  });
});



