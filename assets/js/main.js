'use strict';

const mobileWidth = 600; //スマホのメディアクエリ横幅指定

// jQuery
$(function(){
  // ページ表示時のエフェクト用(ふわっと表示する)
  setTimeout(function(){
  $('.starting').fadeOut(1000);
  }, 200);

  // ヘッダのコンタクト項目ホバー時アイコン変化
  $('.contact-btn a').hover(function(){
    $(this).find('.mail').removeClass('fa-envelope').addClass('fa-envelope-open');
    $(this).find('.teams').css('margin-right','5px').removeClass('fa-user-friends').addClass('fa-comment-dots');
  },function(){
    $(this).find('.mail').removeClass('fa-envelope-open').addClass('fa-envelope');
    $(this).find('.teams').css('margin-right','3px').removeClass('fa-comment-dots').addClass('fa-user-friends');
  });

  // スクロール時にナビメニュー固定
  $(window).scroll(function(){
    if($(window).innerWidth() > mobileWidth){   //スマホ環境では動作させない
      const headerPos = $('.header').outerHeight();
      if($('body, html').scrollTop() > headerPos){
        $('.globalnav').css({
          'position' : 'fixed',
          'z-index' : '10',
          'top' : '0',
          'left' : '50%',
          'transform' : 'translateX(-50%)',
          'margin' : '8px 0 10px 0',
          'background-color' : 'rgba(18,39,74, .7)',
        });
        $('.globalnav a').css(
          'color', '#fff'
          );
        $('.dark-mode .globalnav').css({
          'background-color' : '#000',
        });
        $('.contact-btn').css({
          'position' : 'fixed',
          'z-index' : '10',
          'top' : '0',
          'right' : '0',
          'background-color' : 'rgba(18,39,74, .7)',
          'height' : headerPos - 1,
        });
        $('.dark-mode .contact-btn').css({
          'background-color' : '#000',
        });
      }else{
        $('.globalnav').css({
          'display' : '', 'position' : '', 'z-index' : '', 'top' : '', 'left' : '', 'transform' : '', 'margin' : '', 'background-color' : '',
        });
        $('.globalnav a').css(
          'color', ''
        );
        $('.contact-btn').css({
          'display' : '',' position' : '', 'z-index' : '', 'top' : '', 'right' : '', 'background-color' : '',
        });
      }
    }
  });

    // メインビジュアルのスライドショー
    const slideCount = $('.slide-item').length;
    let currentSlide = 1;
    let nextSlide = 2;
    const interval = 7600;
    const duration = 1400;
    let timer;

    $('.slide-item:not(:first-child)').hide();
    function slideTimer(){
      $('.slide-item:nth-child('+currentSlide+')').fadeOut(duration);
      $('.slide-item:nth-child('+nextSlide+')').fadeIn(duration);
      currentSlide = nextSlide;
      nextSlide = ++nextSlide;
      if(nextSlide > slideCount){
        nextSlide = 1;
      }
      $('.slide-select ul li').removeClass('selected');
      $('.slide-select ul li:nth-child('+currentSlide+')').addClass('selected');
    }
    timer = setInterval(slideTimer,interval);
  
    $(window).blur(function(){            //ウィンドウがアクティブでないときスライドショー停止する
      clearInterval(timer);
    });
    $(window).focus(function(){
      clearInterval(timer);
      timer = setInterval(slideTimer,interval);
    });

    $('.slide-select ul li').click(function(){    //画像下部のアイコンクリック時に遷移
      nextSlide = $(this).html();
      clearInterval(timer);
      timer = setInterval(slideTimer,interval);
      slideTimer();
      return false;
    });

    // スマホ用 メインビジュアルスワイプ時の挙動
    const dist =30
    let startX,
        startY,
        moveX,
        moveY;
    $('.slide-item').on('touchstart', function(e){
      e.preventDefault();
      startX = e.touches[0].pageX;
      startY = e.touches[0].pageY;
    });
    $('.slide-item').on('touchmove', function(e){
      e.preventDefault();
      moveX = e.changedTouches[0].pageX;
      moveY = e.changedTouches[0].pageY;
    });
    $('.slide-item').on('touchend', function(e){
      if(startX > moveX && startX > moveX + dist){
        nextSlide = $(this).attr("data-next");
        clearInterval(timer);
        timer = setInterval(slideTimer,interval);
        slideTimer();
      }else if(startX < moveX && startX + dist < moveX){
        nextSlide = $(this).attr("data-prev");
        clearInterval(timer);
        timer = setInterval(slideTimer,interval);
        slideTimer();
      }
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
    const linkTextsJpn = ['メンバー紹介', '規則･規程', '人事制度', '研修', '各種フォーム', 'その他情報'];
    const linkTextsEng = ['Members', 'Rules', 'System', 'Learning', 'Forms', 'Others'];
    $('.section-img > a').each(function(index){
      $(this).hover(function(){
        if($('#eng-check').hasClass('no-display')){   //Englishモードになっていない場合の処理
          $(this).append('<p>'+ linkTextsJpn[index] + '</p>');
          $(this).find('p').addClass('link-text').hide();
          $(this).find('p').fadeIn(800);
        }else{
          $(this).append('<p>' + linkTextsEng[index] + '</p>');
          $(this).find('p').addClass('link-text').hide();
          $(this).find('p').fadeIn(800);
        }
      },function(){
        $(this).find('p').remove();
      });
    });

// YouTube埋め込みここから-----------------------------------------
    //プレイヤー変数
    var player;

    //オブジェクト生成
    function youtubeAPIInit() {
        var scriptTag = document.createElement('script');
        scriptTag.src = "https://www.youtube.com/iframe_api";
        var fsTag = document.getElementsByTagName('script')[0];
        fsTag.parentNode.insertBefore(scriptTag, fsTag);
        window.onYouTubeIframeAPIReady = function(){
            player = new YT.Player('player', {
                height:'540',
                width:'960',
                videoId:'WbwXBA6hTzc', //ここに埋め込みたいYouTube動画のIDを記入
                playerVars:{
                    autohide:1,
                    controls:1,
                    modestbranding:1,
                    iv_load_policy:3,
                    showinfo:0,
                    rel:0,
                    autoplay:0,     //リンククリック時に自動再生する場合は1
                    // loop:1,
                    // playlist:'', //ここにもIDを記入する (ループのため)
                },
                  
            });
        };
    }
    function youtubeAPIInit2() {
        var scriptTag = document.createElement('script');
        scriptTag.src = "https://www.youtube.com/iframe_api";
        var fsTag = document.getElementsByTagName('script')[0];
        fsTag.parentNode.insertBefore(scriptTag, fsTag);
        window.onYouTubeIframeAPIReady = function(){
            player = new YT.Player('player', {
                height:'540',
                width:'960',
                videoId:'YWWzUeaQXmA', //ここに埋め込みたいYouTube動画のIDを記入
                playerVars:{
                    autohide:1,
                    controls:1,
                    modestbranding:1,
                    iv_load_policy:3,
                    showinfo:0,
                    rel:0,
                    autoplay:0,     //リンククリック時に自動再生する場合は1
                    // loop:1,
                    // playlist:'', //ここにもIDを記入する (ループのため)
                },
                  
            });
        };
    }
    function youtubeAPIInit3() {
        var scriptTag = document.createElement('script');
        scriptTag.src = "https://www.youtube.com/iframe_api";
        var fsTag = document.getElementsByTagName('script')[0];
        fsTag.parentNode.insertBefore(scriptTag, fsTag);
        window.onYouTubeIframeAPIReady = function(){
            player = new YT.Player('player', {
                height:'540',
                width:'960',
                videoId:'QQsETWSP2ng', //ここに埋め込みたいYouTube動画のIDを記入
                playerVars:{
                    autohide:1,
                    controls:1,
                    modestbranding:1,
                    iv_load_policy:3,
                    showinfo:0,
                    rel:0,
                    autoplay:0,     //リンククリック時に自動再生する場合は1
                    // loop:1,
                    // playlist:'', //ここにもIDを記入する (ループのため)
                },
                  
            });
        };
    }
    function youtubeAPIInit4() {
        var scriptTag = document.createElement('script');
        scriptTag.src = "https://www.youtube.com/iframe_api";
        var fsTag = document.getElementsByTagName('script')[0];
        fsTag.parentNode.insertBefore(scriptTag, fsTag);
        window.onYouTubeIframeAPIReady = function(){
            player = new YT.Player('player', {
                height:'540',
                width:'960',
                videoId:'6bo85fC7Eug', //ここに埋め込みたいYouTube動画のIDを記入
                playerVars:{
                    autohide:1,
                    controls:1,
                    modestbranding:1,
                    iv_load_policy:3,
                    showinfo:0,
                    rel:0,
                    autoplay:0,     //リンククリック時に自動再生する場合は1
                    // loop:1,
                    // playlist:'', //ここにもIDを記入する (ループのため)
                },
                  
            });
        };
    }
    function youtubeAPIInit5() {
        var scriptTag = document.createElement('script');
        scriptTag.src = "https://www.youtube.com/iframe_api";
        var fsTag = document.getElementsByTagName('script')[0];
        fsTag.parentNode.insertBefore(scriptTag, fsTag);
        window.onYouTubeIframeAPIReady = function(){
            player = new YT.Player('player', {
                height:'540',
                width:'960',
                videoId:'W4T3Tzf9_lE', //ここに埋め込みたいYouTube動画のIDを記入
                playerVars:{
                    autohide:1,
                    controls:1,
                    modestbranding:1,
                    iv_load_policy:3,
                    showinfo:0,
                    rel:0,
                    autoplay:0,     //リンククリック時に自動再生する場合は1
                    // loop:1,
                    // playlist:'', //ここにもIDを記入する (ループのため)
                },
                  
            });
        };
    }
    function youtubeAPIInit6() {
        var scriptTag = document.createElement('script');
        scriptTag.src = "https://www.youtube.com/iframe_api";
        var fsTag = document.getElementsByTagName('script')[0];
        fsTag.parentNode.insertBefore(scriptTag, fsTag);
        window.onYouTubeIframeAPIReady = function(){
            player = new YT.Player('player', {
                height:'540',
                width:'960',
                videoId:'Q3C5Z3ooAx0', //ここに埋め込みたいYouTube動画のIDを記入
                playerVars:{
                    autohide:1,
                    controls:1,
                    modestbranding:1,
                    iv_load_policy:3,
                    showinfo:0,
                    rel:0,
                    autoplay:0,     //リンククリック時に自動再生する場合は1
                    // loop:1,
                    // playlist:'', //ここにもIDを記入する (ループのため)
                },
                  
            });
        };
    }
    function youtubeAPIInit7() {
        var scriptTag = document.createElement('script');
        scriptTag.src = "https://www.youtube.com/iframe_api";
        var fsTag = document.getElementsByTagName('script')[0];
        fsTag.parentNode.insertBefore(scriptTag, fsTag);
        window.onYouTubeIframeAPIReady = function(){
            player = new YT.Player('player', {
                height:'540',
                width:'960',
                videoId:'Qw-krERmYwo', //ここに埋め込みたいYouTube動画のIDを記入
                playerVars:{
                    autohide:1,
                    controls:1,
                    modestbranding:1,
                    iv_load_policy:3,
                    showinfo:0,
                    rel:0,
                    autoplay:0,     //リンククリック時に自動再生する場合は1
                    // loop:1,
                    // playlist:'', //ここにもIDを記入する (ループのため)
                },
                  
            });
        };
    }
    function youtubeAPIInit8() {
        var scriptTag = document.createElement('script');
        scriptTag.src = "https://www.youtube.com/iframe_api";
        var fsTag = document.getElementsByTagName('script')[0];
        fsTag.parentNode.insertBefore(scriptTag, fsTag);
        window.onYouTubeIframeAPIReady = function(){
            player = new YT.Player('player', {
                height:'540',
                width:'960',
                videoId:'FJrYkmte9Mc', //ここに埋め込みたいYouTube動画のIDを記入
                playerVars:{
                    autohide:1,
                    controls:1,
                    modestbranding:1,
                    iv_load_policy:3,
                    showinfo:0,
                    rel:0,
                    autoplay:0,     //リンククリック時に自動再生する場合は1
                    // loop:1,
                    // playlist:'', //ここにもIDを記入する (ループのため)
                },
                  
            });
        };
    }

    //モーダル
    var modal = {}, $lay, $content;
    modal.inner = function() {
        if($("#modal-overlay")[0]) return false;
        $("body").append('<div id="modal-overlay"></div>');
        $lay = $("#modal-overlay");
        $content = $("#modal-content");
        $lay.fadeIn("slow");
        youtubeAPIInit();
        this.resize();
        $content.fadeIn("fast");
        $lay.unbind().click(function() {
            player.pauseVideo();
            $content.add($lay).fadeOut("fast",function(){
                $lay.remove();
            });
        });
    };
    
    modal.inner2 = function() {
        if($("#modal-overlay")[0]) return false;
        $("body").append('<div id="modal-overlay"></div>');
        $lay = $("#modal-overlay");
        $content = $("#modal-content");
        $lay.fadeIn("slow");
        youtubeAPIInit2();
        this.resize();
        $content.fadeIn("fast");
        $lay.unbind().click(function() {
            player.pauseVideo();
            $content.add($lay).fadeOut("fast",function(){
                $lay.remove();
            });
        });
    };
    modal.inner3 = function() {
        if($("#modal-overlay")[0]) return false;
        $("body").append('<div id="modal-overlay"></div>');
        $lay = $("#modal-overlay");
        $content = $("#modal-content");
        $lay.fadeIn("slow");
        youtubeAPIInit3();
        this.resize();
        $content.fadeIn("fast");
        $lay.unbind().click(function() {
            player.pauseVideo();
            $content.add($lay).fadeOut("fast",function(){
                $lay.remove();
            });
        });
    };
    modal.inner4 = function() {
        if($("#modal-overlay")[0]) return false;
        $("body").append('<div id="modal-overlay"></div>');
        $lay = $("#modal-overlay");
        $content = $("#modal-content");
        $lay.fadeIn("slow");
        youtubeAPIInit4();
        this.resize();
        $content.fadeIn("fast");
        $lay.unbind().click(function() {
            // player.pauseVideo();
            // player.clearVideo();
            $content.add($lay).fadeOut("fast",function(){
                $lay.remove();
            });
        });
    };
    modal.inner5 = function() {
        if($("#modal-overlay")[0]) return false;
        $("body").append('<div id="modal-overlay"></div>');
        $lay = $("#modal-overlay");
        $content = $("#modal-content");
        $lay.fadeIn("slow");
        youtubeAPIInit5();
        this.resize();
        $content.fadeIn("fast");
        $lay.unbind().click(function() {
            // player.pauseVideo();
            // player.clearVideo();
            $content.add($lay).fadeOut("fast",function(){
                $lay.remove();
            });
        });
    };
    modal.inner6 = function() {
        if($("#modal-overlay")[0]) return false;
        $("body").append('<div id="modal-overlay"></div>');
        $lay = $("#modal-overlay");
        $content = $("#modal-content");
        $lay.fadeIn("slow");
        youtubeAPIInit6();
        this.resize();
        $content.fadeIn("fast");
        $lay.unbind().click(function() {
            // player.pauseVideo();
            // player.clearVideo();
            $content.add($lay).fadeOut("fast",function(){
                $lay.remove();
            });
        });
    };
    modal.inner7 = function() {
        if($("#modal-overlay")[0]) return false;
        $("body").append('<div id="modal-overlay"></div>');
        $lay = $("#modal-overlay");
        $content = $("#modal-content");
        $lay.fadeIn("slow");
        youtubeAPIInit7();
        this.resize();
        $content.fadeIn("fast");
        $lay.unbind().click(function() {
            // player.pauseVideo();
            // player.clearVideo();
            $content.add($lay).fadeOut("fast",function(){
                $lay.remove();
            });
        });
    };
    modal.inner8 = function() {
        if($("#modal-overlay")[0]) return false;
        $("body").append('<div id="modal-overlay"></div>');
        $lay = $("#modal-overlay");
        $content = $("#modal-content");
        $lay.fadeIn("slow");
        youtubeAPIInit8();
        this.resize();
        $content.fadeIn("fast");
        $lay.unbind().click(function() {
            // player.pauseVideo();
            // player.clearVideo();
            $content.add($lay).fadeOut("fast",function(){
                $lay.remove();
            });
        });
    };
    //リサイズ処理
    modal.resize = function(){
        var $winWidth = $(window).width();
        var $winHeight = $(window).height();
        var $contentOuterWidth = $("#modal-content").outerWidth();
        var $contentOuterHeight = $("#modal-content").outerHeight();
        $("#modal-content").css({
            "left": (($winWidth - $contentOuterWidth) / 2) + "px",
            "top": (($winHeight - $contentOuterHeight) / 2) + "px"
        });
    }
  
    //クリック処理
    $("#modal-open").click(function(){
        modal.inner();
        // player.playVideo();
    });
    $(window).resize(modal.resize);

    $("#modal-open2").click(function(){
        modal.inner2();
        // player.playVideo();
    });
    $(window).resize(modal.resize);

    $("#modal-open3").click(function(){
        modal.inner3();
        // player.playVideo();
    });
    $(window).resize(modal.resize);

    $("#modal-open4").click(function(){
        modal.inner4();
        // player.playVideo();
    });
    $(window).resize(modal.resize);

    $("#modal-open5").click(function(){
        modal.inner5();
        // player.playVideo();
    });
    $(window).resize(modal.resize);

    $("#modal-open6").click(function(){
        modal.inner6();
        // player.playVideo();
    });
    $(window).resize(modal.resize);
    
    $("#modal-open7").click(function(){
        modal.inner7();
        // player.playVideo();
    });
    $(window).resize(modal.resize);
    $("#modal-open8").click(function(){
        modal.inner8();
        // player.playVideo();
    });
    $(window).resize(modal.resize);
    // $("#modal-overlay").click(function(){
    //   $("#modal-overlay").remove();
    //   $("#modal-content").empty();
    // });


// YouTube埋め込みここまで-----------------------------------------

}); //jQueryここまで



document.addEventListener('DOMContentLoaded',function(){
  // ダークモード切替(bodyにdark-modeクラスを付け外しし制御。切替状態はCookie保存する)
  const darkModeBtn = document.getElementById('btn-mode');
  const darkModeSelect = Cookies.get('darkModeOn');

  if(darkModeSelect === 'on'){                // Cookieで取得した値がonの場合ダークモードにする
    darkModeBtn.checked = true;
  } else{
    darkModeBtn.checked = false;
  }
  if(darkModeBtn.checked === true){
    document.body.classList.add('dark-mode');
  }
  
  darkModeBtn.addEventListener('change',function(){
    if(darkModeBtn.checked === true){
      // ページ遷移時と同じエフェクトを、色を変えて使用(jQuery)
      $('.starting').css('background-color','rgba(0,0,0)').show();
      document.body.classList.add('dark-mode');
      Cookies.set('darkModeOn','on',{expires:1/48});
    }else{
      $('.starting').css('background-color','#fff').show();
      document.body.classList.remove('dark-mode');
      Cookies.remove('darkModeOn');
    }
      $('.starting').fadeOut(600);
  })
  
  //日⇔英切替 (no-display クラスで表示を制御する。切替状態はCookie保存する)
  const langSwitchBtn = document.getElementById('btn-lang');
  const EngSelect = Cookies.get('EngOn');
  const JpnText = Array.prototype.slice.call(document.querySelectorAll('.ja'));
  const EngText = Array.prototype.slice.call(document.querySelectorAll('.en'));
  
  if(EngSelect === 'on'){             // Cookieで取得した値がonの場合英字表記にする
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
    $('.starting').show();
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
    $('.starting').fadeOut(600);
  });

  //文字表示のアニメーションの制御
  function textAnimation(selectClass, delayTime){
    const animationTargetElements = document.querySelectorAll(selectClass);
    for (let i = 0; i < animationTargetElements.length; i++) {

      //対象のクラスそれぞれについて、文字列を取得後、分割して配列に代入、
      //その後、一文字ずつspanタグとアニメーションディレイをつけて新規配列に代入、
      //新規配列の内容を一文字ずつ、対象のクラスのテキストに代入する。

      const targetElement = animationTargetElements[i],
            texts = targetElement.textContent,
            textChars = texts.split(""),
            textsArray = [];
      targetElement.textContent=" ";
      for (let j = 0; j < textChars.length; j++) {
        if(textChars[j]===" "){
          textsArray.push(" "); //空白文字の場合はspanタグに入れない
        }else{
          textsArray.push('<span style="animation-delay:' + (j*delayTime) + 's;">' + textChars[j] + '</span>');
        }
      }
      for (let k = 0; k < textsArray.length; k++) {
        targetElement.innerHTML += textsArray[k]; 
      }
    }
  }

  //spanを入れ子にして文字を隠してから表示するパターン
  function textAnimation2(selectClass, delayTime){
    const animationTargetElements = document.querySelectorAll(selectClass);
    for (let i = 0; i < animationTargetElements.length; i++) {
      const targetElement = animationTargetElements[i],
            texts = targetElement.textContent,
            textChars = texts.split(""),
            textsArray = [];
      targetElement.textContent=" ";
      for (let j = 0; j < textChars.length; j++) {
        if(textChars[j]===" "){
          textsArray.push(" ");
        }else{
          //spanの下のspanにアニメーションを設定する。
          textsArray.push('<span><span style="animation-delay:' + (j*delayTime) + 's;">' + textChars[j] + '</span></span>');
        }
      }
      for (let k = 0; k < textsArray.length; k++) {
        targetElement.innerHTML += textsArray[k]; 
      }
    }
  }

  //トップページのヘッダタイトルのアニメーション(ページ表示時に実行)
  setTimeout(textAnimation('.show-text-top',0.5),600);
  //メンバー紹介ページの氏名のアニメーション
  setTimeout(textAnimation2('.show-text-member',0.1),600);

  //メンバー紹介ページスクロール時に表示するアニメーション
  const targetSection = document.querySelectorAll('.member-content');
  if(targetSection.length !== 0){
    document.addEventListener('scroll',function(){
      document.querySelector('.scroll-imply').classList.add('hide');
      for (let i = 0; i < targetSection.length; i++) {
        const targetDistance = targetSection[i].getBoundingClientRect().top + targetSection[i].clientHeight * .5;
        if(window.innerHeight > targetDistance){
          targetSection[i].classList.add('show');  //showクラスをつけることで、cssアニメーションを制御する
        }
      }
    });
  }
  
  //指定日までのカウントダウン表示
  const today = new Date();
  const year = today.getFullYear(),
        month = String(today.getMonth() + 1).padStart(2,'0'),
        date = String(today.getDate()).padStart(2,'0'),
        days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
        day = days[today.getDay()];
  
  const dueDate = new Date(2020,8,23); //指定の日付 (月はマイナス１で記入する)
  const dMonth = dueDate.getMonth() + 1,
        dDate = dueDate.getDate(),
        dDay = String(days[dueDate.getDay()]).padStart(2,'0');

  const countdownDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24 ));

  function insertTextByClass(selectClass,txt){
    document.querySelectorAll(selectClass).forEach(function(eachClass){
      eachClass.textContent = txt;
    });
  }
  insertTextByClass('.today', year + '/' + month + '/' + date);
  insertTextByClass('.due-date', dMonth + '/' + dDate + ' ' + '(' + dDay + ')');
  insertTextByClass('.countdown', countdownDays);

});
