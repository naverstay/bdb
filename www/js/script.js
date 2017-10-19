var s, wnd, html_var, body_var, boardGrid, logoTrigger, scrollbar, cur_scroll = 0, updateSkrlr,
  menu_timer, resizeTimer,
  thanks_popup, callback_popup, agreement_popup,
  reviewSlider, friendSlider, instaSlider,
  bookSlider,
  projectSlider,
  partnerSlider,
  form_pos_settings = {
    my: "top center",
    at: "top center",
    of: window,
    using: function (obj, info) {
      var dialog_form = $(this);
      dialog_form.css({
        left: ((wnd.width() - dialog_form.width()) / 2) + 'px'
      });
    }
  };

$(function ($) {

  wnd = $(window);
  html_var = $('html');
  body_var = $('body');
  logoTrigger = $('.logoTrigger');

  checkFullHeight();

  //all_dialog_close();

  initCallbackPopup();

  //$('html').addClass('ov_hidden');
  //scrollbar = Scrollbar.init(body_var[0]);

  $('.sticky').on('sticky_kit:bottom', function (e) {
    $(this).addClass('_bottom');
  }).on('sticky_kit:unbottom', function (e) {
    $(this).removeClass('_bottom');
  }).each(function (ind) {
    var stck = $(this);

    stck.css('padding-top', stck.attr('data-margin-top') + 'px').stick_in_parent({
      sticky_class: stck.attr('data-sticky-class')
    });
  });

  body_var
    .delegate('.callbackForm', 'submit', function () {

      if ($('#agreement_check').prop('checked')) {
        callback_popup.dialog('close');
        thanks_popup.dialog('open');
      } else {
        callback_popup.dialog('close');
        agreement_popup.dialog('open');
      }

      return false;
    })
    .delegate('.checkDisabler', 'change', function () {
      var checkbox = $(this), target = $(checkbox.attr('data-control'));

      if (target.length) {
        target.attr('disabled', !checkbox.prop('checked'));
      }
    })
    .delegate('.menuBtn', 'click', function () {
      var btn = $(this);

      html_var.toggleClass('ov_hidden');

      //btn.toggleClass('allow-hover');
      body_var.toggleClass('menu-is-open');

      return false;
    })
    .delegate('.menuBtn', 'mouseenter', function () {
      var btn = $(this);

      setTimeout(function () {
        btn.find('span').removeClass("hover-step-2");
        btn.find('span').addClass("hover-step-1");
        menu_timer = setTimeout(function () {
          btn.find('span').removeClass("hover-step-1");
          btn.find('span').addClass("hover-step-2");
        }, 350);
      }, 1);
    })
    .delegate('.menuBtn', 'mouseleave', function () {
      var btn = $(this);

      clearTimeout(menu_timer);

      btn.find('span').addClass("hover-step-2");
      btn.find('span').removeClass("hover-step-1");

    });

  var today = new Date(),
    friday = new Date((new Date()).setHours(24, 0, 0, 0) + (today.getDay() > 5 ?
      today.getDay() : 5 - today.getDay()) * 24 * 60 * 60 * 1000);

  $.countdown.regionalOptions['ru'];

  $("#getting-started").countdown({
    format: 'dHMS',
    padZeroes: true,
    until: new Date(friday.getFullYear(), friday.getMonth(), friday.getDate(), 0, 0)
  });

  initMask();

  initValidation();

  initSkrollr();

});

function ScrollbarCallBack(r) {
  cur_scroll = r.y; //+ $(window).height() * .5;

  console.log(cur_scroll);

  //checkHeaderOffset(r.y);
}

function initSlider(cb) {
  var w = wnd.width();

  var _scroll = {
    delay: 1000,
    easing: 'linear',
    items: 1,
    duration: 0.07,
    timeoutDuration: 0,
    pauseOnHover: 'immediate'
  };

  $('.lineSlider').carouFredSel({
    circular: true,
    infinite: true,
    width: '100%',
    align: false,
    items: {
      width: 'variable',
      visible: 1
    },
    onCreate: function (el) {
      updateSkrollr();
    },
    scroll: _scroll
  });

  partnerSlider = $('.partnerSlider').carouFredSel({
    circular: true,
    infinite: true,
    width: '100%',
    align: false,
    items: {
      width: 'variable',
      visible: 1
    },
    onCreate: function (el) {
      updateSkrollr();
    },
    scroll: _scroll
  });

  friendSlider = $('.friendSlider').carouFredSel({
    circular: true,
    infinite: true,
    responsive: true,
    width: '100%',
    align: false,
    items: {
      visible: {
        min: 1,
        max: w >= 1280 ? 5 : (w >= 980 ? 4 : w >= 768 ? 3 : 2)
      },
      start: 0
    },
    prev: '#friend_prev',
    next: '#friend_next',
    onCreate: function (el) {
      updateSkrollr();
    },
    scroll: _scroll
  });

  projectSlider = $('.projectSlider').carouFredSel({
    circular: true,
    infinite: true,
    responsive: true,
    direction: "left",
    width: '100%',
    auto: {
      play: false
    },
    items: {
      visible: 2
    },
    prev: '#project_prev',
    next: '#project_next'
  });

  instaSlider = $('.instaSlider').carouFredSel({
    circular: true,
    infinite: true,
    responsive: true,
    //direction: "left",
    //width: 1440,
    width: '100%',
    items: {
      visible: {
        min: 1,
        max: w >= 1280 ? 5 : (w >= 980 ? 4 : w >= 768 ? 3 : 2)
      },
      start: 0
    },
    prev: '#insta_prev',
    next: '#insta_next',
    onCreate: function (el) {
      updateSkrollr();
    },
    scroll: _scroll
  });

  $('.lineSlider2').carouFredSel({
    circular: true,
    infinite: true,
    width: '100%',
    align: false,
    items: {
      width: 'variable',
      visible: 1
    },
    onCreate: function (el) {
      updateSkrollr();
    },
    scroll: _scroll
  });

  $('.lineSlider3').carouFredSel({
    circular: true,
    infinite: true,
    width: '100%',
    align: false,
    items: {
      width: 'variable',
      visible: 1
    },
    onCreate: function (el) {
      updateSkrollr();
    },
    scroll: _scroll
  });

  $('.heroSlider').carouFredSel({
    circular: true,
    infinite: true,
    responsive: true,
    direction: "left",
    width: '100%',
    items: {
      visible: 1,
      start: 0
    },
    auto: {
      play: false
    },
    swipe: {
      onTouch: true,
      onMouse: true
    },
    prev: '#hero_prev',
    next: '#hero_next',
    pagination: {
      container: '#hero_pager'
    }
  });

  reviewSlider = $('.reviewSlider').carouFredSel({
    circular: true,
    infinite: true,
    responsive: true,
    direction: "left",
    width: '100%',
    items: {
      visible: {
        min: 1,
        max: w >= 1280 ? 3 : (w >= 980 ? 2 : 1)
      },
      start: 0
    },
    auto: {
      play: false
    },
    swipe: {
      onTouch: true,
      onMouse: true
    },
    prev: '#review_prev',
    next: '#review_next'
  });

  $('.ideaSlider').carouFredSel({
    circular: true,
    infinite: true,
    responsive: true,
    direction: "left",
    width: '100%',
    height: '100%',
    items: {
      visible: 1,
      start: 0
    },
    auto: {
      play: false
    },
    swipe: {
      onTouch: true,
      onMouse: true
    },
    prev: '#idea_prev',
    next: '#idea_next',
    pagination: {
      container: '#idea_pager'
    }
  });

  initBookSlider();

  cb();
}

function initBookSlider() {
  var w = wnd.width();

  if (w > 980) {
    if (bookSlider) {
      bookSlider.trigger("destroy");

      $('.bookSlider').removeAttr('style').find('*').each(function (ind) {
        $(this).removeAttr('style');
      });
    }
  } else {
    if (!bookSlider) {
      bookSlider = $('.bookSlider').carouFredSel({
        circular: true,
        infinite: true,
        width: '100%',
        align: false,
        items: {
          width: 'variable',
          visible: 1
        },
        auto: {
          play: false
        },
        swipe: {
          onTouch: true,
          onMouse: true
        },
        prev: '#book_prev',
        next: '#book_next'
      });
    }
  }
}

function initTabs() {

  var tabBlock = $('.tabBlock');

  tabBlock.each(function (ind) {
    var tab = $(this);

    tab.tabs({
      active: 0,
      tabContext: tab.data('tab-context'),
      activate: function (e, u) {

      },
      create: function (e, u) {

      }
    });
  });
}

function initScrollBars() {

  $('.mCSB').mCustomScrollbar({
    documentTouchScroll: true,
    theme: "dark",
    scrollEasing: "linear"
  });
}

function initValidation() {
  $('.validateMe').each(function (ind) {
    var f = $(this);

    f.validationEngine({
      //binded: false,
      scroll: false,
      showPrompts: true,
      showArrow: false,
      addSuccessCssClassToField: 'success',
      addFailureCssClassToField: 'error',
      parentFieldClass: '.formCell',
      // parentFormClass: '.order_block',
      promptPosition: "centerRight",
      //doNotShowAllErrosOnSubmit: true,
      //focusFirstField          : false,
      autoHidePrompt: false,
      autoHideDelay: 3000,
      autoPositionUpdate: false,
      prettySelect: true,
      //useSuffix                : "_VE_field",
      addPromptClass: 'relative_mode one_msg',
      showOneMessage: false
    });
  });
}

function initMask(el) {

  if (el == void 0) {
    el = $("input");
  }

  el.each(function (i, el) {
    var inp = $(el), param = {};

    if (inp.attr('data-inputmask') != void 0) {
      inp.inputmask();
    }

    if (inp.attr('data-inputmask-email') != void 0) {
      param.regex = inp.attr('data-inputmask-email');
      param.placeholder = '_';

      inp.inputmask('Regex', param);
    }

    if (inp.attr('data-inputmask-regex') != void 0) {
      inp.inputmask('Regex', param);
    }

    if (inp.attr('data-inputmask-custom') != void 0) {
      inp.inputmask(JSON.parse('{' + inp.attr('data-inputmask-custom').replace(/'/g, '"') + '}'));
    }
  });
}

function all_dialog_close() {
  body_var.on('click', '.ui-widget-overlay', all_dialog_close_gl);
}

function all_dialog_close_gl() {
  $(".ui-dialog-content").each(function () {
    var $this = $(this);
    if (!$this.parent().hasClass('always_open')) {
      $this.dialog("close");
    }
  });
}

function initCallbackPopup() {
  callback_popup = $('#callback_popup').dialog({
    autoOpen: false,
    modal: true,
    closeOnEscape: true,
    closeText: '',
    dialogClass: 'dialog_close_butt_mod_1 dialog_g_size_1 dialog_g_size_2',
    appendTo: '.modal_holder',
    width: 750,
    draggable: true,
    collision: "fit",
    position: form_pos_settings,
    open: function (event, ui) {
      body_var.addClass('modal_opened overlay_v2');
    },
    close: function (event, ui) {
      body_var.removeClass('modal_opened overlay_v2');
    }
  });

  $('.callbackBtn').on('click', function () {
    callback_popup.dialog('open');
    return false;
  });

  agreement_popup = $('#agreement_popup').dialog({
    autoOpen: false,
    modal: true,
    closeOnEscape: true,
    closeText: '',
    dialogClass: 'dialog_close_butt_mod_1 dialog_g_size_1 dialog_g_size_2',
    appendTo: '.modal_holder',
    width: 750,
    draggable: true,
    collision: "fit",
    position: form_pos_settings,
    open: function (event, ui) {
      body_var.addClass('modal_opened overlay_v2');
    },
    close: function (event, ui) {
      body_var.removeClass('modal_opened overlay_v2');
    }
  });

  thanks_popup = $('#thanks_popup').dialog({
    autoOpen: false,
    modal: true,
    closeOnEscape: true,
    closeText: '',
    dialogClass: 'dialog_close_butt_mod_1 dialog_g_size_1 dialog_g_size_2',
    appendTo: '.modal_holder',
    width: 750,
    draggable: true,
    collision: "fit",
    position: form_pos_settings,
    open: function (event, ui) {
      body_var.addClass('modal_opened overlay_v2');
    },
    close: function (event, ui) {
      body_var.removeClass('modal_opened overlay_v2');
    }
  });

}

function updateSkrollr() {
  clearTimeout(updateSkrlr);

  updateSkrlr = setTimeout(function () {
    //console.log('skrollr.force', s);
    window.dispatchEvent(new Event('skrollr.force'));
    if (s) s.refresh();
  }, 1000);
}

function initSkrollr() {
  var $window = $(window);		//Window object

  if ($window.width() > 980) {
    var scrollTime = .1;			//Scroll time
    var scrollDistance = 50;		//Distance. Use smaller value for shorter scroll and greater value for longer scroll

    $window.on("mousewheel DOMMouseScroll", function (event) {
      event.preventDefault();

      var delta = event.originalEvent.wheelDelta / 50 || -event.originalEvent.detail / 3;
      var scrollTop = getScrollTop();
      var finalScroll = scrollTop - parseInt(delta * scrollDistance);

      TweenMax.to($window, scrollTime, {
        scrollTo: {y: finalScroll, autoKill: true},
        ease: Power1.easeOut,	//For more easing functions see https://api.greensock.com/js/com/greensock/easing/package-detail.html
        autoKill: true,
        overwrite: 5
      });
    });

    s = skrollr.init({
      forceHeight: false,
      //scale: .6,
      //mobileCheck: function () {
      //  return false;
      //},
      skrollrBody: 'scroll-content',
      //edgeStrategy: 'style',
      easing: 'easeOutQuad'
    });

  } else {
    if (s) {
      var elements = $('.skrollable');
      s.destroy();
      elements.removeAttr('style');
    }
  }
}

$(window).on('scroll', function () {

  checkScroll();

}).on('load', function () {

  body_var.addClass('dom-is-loaded');

  //setTimeout(function () {
  initSlider(function () {
    boardGrid = $('.boardGrid').isotope({
      percentPosition: true,
      gutter: 0,
      // main isotope options
      itemSelector: '.gridItem',
      // set layoutMode
      layoutMode: 'packery'
    });

    updateSkrollr();
    //}, 1);

    checkScroll();
  });

}).on('resize', function () {
  var w = wnd.width();

  checkFullHeight();

  checkScroll();

  initSkrollr();

  if (reviewSlider) {
    reviewSlider
      .trigger("finish")
      .trigger("configuration", {
        items: {
          visible: {
            max: w >= 1280 ? 3 : (w >= 980 ? 2 : 1)
          }
        },
        reInit: true
      });
  }

  if (projectSlider) {
    projectSlider
      .trigger("finish")
      .trigger("configuration", {
        items: {
          visible: 2
        },
        reInit: true
      });
  }

  if (friendSlider) {
    friendSlider
      .trigger("finish")
      .trigger("configuration", {
        items: {
          visible: {
            max: w >= 1280 ? 5 : (w >= 980 ? 4 : w >= 768 ? 3 : 2)
          }
        },
        reInit: true
      });
  }

  if (instaSlider) {
    instaSlider
      .trigger("finish")
      .trigger("configuration", {
        items: {
          visible: {
            max: w >= 1280 ? 5 : (w >= 980 ? 4 : w >= 768 ? 3 : 2)
          }
        },
        reInit: true
      });
  }

  initBookSlider();

});

function checkFullHeight() {
  var h = $(window).height(), w = $(window).width();

  $('.winW').css('width', w);
  $('.winH').css('height', h);
  $('.winHmin').css('min-height', h);
}

function getScrollTop() {
  if (cur_scroll) return cur_scroll;
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function onYouTubePlayerAPIReady() {
  $('.playOnScroll').addClass('autoPlayMe');
}

function checkScroll() {

  //if (s) s.refresh();

  var top = getScrollTop(), win_h = $(window).height(), cur_section = 0;

  //for (var i = logoTrigger.length; i > 0; i--) {
  //  var section = $(logoTrigger[i - 1]);
  //  if (top && ((top + win_h / 2) > section.offset().top)) {
  //    cur_section = $('.sectionLogo[data-target="' + section.attr('id') + '"]').index();
  //    break;
  //  }
  //}

  $('.header').toggleClass('_fixed', top > 70);

  $('.firstLogo').css('margin-top', -70 * cur_section);

  var videos = $('.autoPlayMe'), fraction = .8;

  for (var i = 0; i < videos.length; i++) {
    var video = videos[i];

    var x = 0,
      y = 0,
      w = video.width,
      h = video.height,
      r, //right
      b, //bottom 
      visibleX, visibleY, visible,
      parent;

    parent = video;
    while (parent && parent !== document.body) {
      x += parent.offsetLeft;
      y += parent.offsetTop;
      parent = parent.offsetParent;
    }

    r = x + parseInt(w);
    b = y + parseInt(h);

    visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
    visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));
    visible = visibleX * visibleY / (w * h);

    if (visible > fraction) {
      $(video).closest('.video_block').addClass('_playing');
      callPlayer($(video), 'playVideo');
    }
    else if (visible < fraction) {
      $(video).closest('.video_block').removeClass('_playing');
      callPlayer($(video), 'pauseVideo');
    }
  }
}

/*
 * @author       Rob W (http://stackoverflow.com/a/7513356/938089
 * @description  Executes function on a framed YouTube video (see previous link)
 *               For a full list of possible functions, see:
 *               http://code.google.com/apis/youtube/js_api_reference.html
 * @param String frame_id The id of (the div containing) the frame
 * @param String func     Desired function to call, eg. "playVideo"
 * @param Array  args     (optional) List of arguments to pass to function func*/
function callPlayer(frame_id, func, args) {
  if (window.jQuery && frame_id instanceof jQuery) frame_id = frame_id.get(0).id;
  var iframe = document.getElementById(frame_id);
  if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
    iframe = iframe.getElementsByTagName('iframe')[0];
  }
  if (iframe) {
    // Frame exists, 
    iframe.contentWindow.postMessage(JSON.stringify({
      "event": "command",
      "func": func,
      "args": args || [],
      "id": frame_id
    }), "*");
  }
}
