(function ($) {
  ("use strict");

  /* Windows Load */
  $(window).on('load', function () {
    preLoader();
  });
  /* Preloader activation */
  function preLoader() {
    $('#loading').delay(500).fadeOut(500);
  };

  /*======================================
  Mobile Menu Js
  ========================================*/
  $("#mobile-menu").meanmenu({
    meanMenuContainer: ".mobile-menu",
    meanScreenWidth: "991",
    meanExpand: ['<i class="fal fa-plus"></i>'],
  });

  /*----------------------------------------
  Sidebar Toggle
  -----------------------------------------*/
  $(".offcanvas__close,.offcanvas__overlay").on("click", function () {
    $(".offcanvas__info").removeClass("info-open");
    $(".offcanvas__overlay").removeClass("overlay-open");
  });
  $(".offcanvas-toggle").on("click", function () {
    $(".offcanvas__info").addClass("info-open");
    $(".offcanvas__overlay").addClass("overlay-open");
  });

  /*======================================
  Sticky Header Js
  ========================================*/

  $(window).scroll(function () {
    if ($(this).scrollTop() > 250) {
      $("#header-sticky").addClass("bd-sticky");
    } else {
      $("#header-sticky").removeClass("bd-sticky");
    }
  });

  /*----------------------------------------
    Body overlay Js
  -----------------------------------------*/
  $(".body-overlay").on("click", function () {
    $(".offcanvas__area").removeClass("offcanvas-opened");
    $(".body-overlay").removeClass("opened");
  });

  if ($(".nav-doc-sidebar > li").hasClass("active")) {
    $(".nav-doc-sidebar > li.active").find("ul").slideDown(700);
  }

  $(".nav-doc-sidebar > li .icon").each(function () {
    let $this = $(this);
    $this.on("click", function (e) {
      let hasClass = $this.parent().hasClass("active");
      $(".nav-doc-sidebar li").removeClass("active");

      if (hasClass) {
        $this.parent().removeClass("active");
      } else {
        $this.parent().addClass("active");
      }
    });
  });

  // sidebar up&down
  if ($(".nav-doc-sidebar > li").hasClass("active")) {
    $(".nav-doc-sidebar > li.active").find("ul").slideDown(700);
  }

  function active_dropdown() {
    $(".nav-doc-sidebar > li .icon").on("click", function (e) {
      $(this).parent().find("ul").first().toggle(300);
      $(this).parent().siblings().find("ul").hide(300);
    });
  }

  active_dropdown();

  $(".nav-doc-sidebar > li .icon").each(function () {
    var $this = $(this);
    $this.on("click", function (e) {
      var has = $this.parent().hasClass("active");
      $(".nav-doc-sidebar li").removeClass("active");
      if (has) {
        $this.parent().removeClass("active");
      } else {
        $this.parent().addClass("active");
      }
    });
  });

  // progress-bar
  $(document).ready(function () {
    $(window);
    let t = $(document.body),
      n = $(".bd-doc-container").find(".nav-doc-sidebar");
    t.scrollspy({
      target: ".bd-doc-sidebar",
    }),
      n.find("> li > a").before($('<span class="bd-progress-bar" />'));
    n.offset().top;
    $(window).scroll(function () {
      $(".nav-doc-sidebar").height();
      let t = $(this).scrollTop(),
        n = $(this).innerHeight(),
        e = $(".nav-doc-sidebar li a").filter(".active").index();
      $(".bd-doc-section").each(function (i) {
        let c = $(this).offset().top,
          s = $(this).height(),
          a = c + s,
          r = 0;
        t >= c && t <= a
          ? (r = ((t - c) / s) * 100) >= 100 && (r = 100)
          : t > a && (r = 100),
          a < t + n - 70 && (r = 100);
        let d = $(".nav-doc-sidebar .bd-progress-bar:eq(" + i + ")");
        e > i && d.parent().addClass("seen"), d.css("width", r + "%");
      });
    });
  });

  let originalAddClassMethod = jQuery.fn.addClass;

  jQuery.fn.addClass = function () {
    // Execute the original method.
    let result = originalAddClassMethod.apply(this, arguments);

    // trigger a custom event
    jQuery(this).trigger("cssClassChanged");

    // return the original result
    return result;
  };

  $(window).on("scroll", function () {
    $(".nav-doc-sidebar > li a").bind("cssClassChanged", function (e) {
      $(".nav-doc-sidebar > li").each(function () {
        if ($(this).hasClass("active") == true) {
          $(this).removeClass("active");
          $(this).find(".bd-submenu li").removeClass("active");
        }
      });
      $(this).removeClass("active").parent().addClass("active");
      $(".bd-submenu li.active").parent().closest("li").addClass("active");
      console.log("hi");
    });
  });

  $('.bd-doc-menu a[href^="#"]:not([href="#"]').on("click", function (e) {
    let $link = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($link.attr("href")).offset().top - 130,
        },
        900
      );
    e.preventDefault();
  });

  $('.doc_menu a[href^="#"]:not([href="#"]').on("click", function (event) {
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top,
        },
        900
      );
    event.preventDefault();
  });

  /*=========== anchors js ===========*/

  if ($(".load-order").length) {
    var Anchor1 = new AnchorJS();
    document.addEventListener("DOMContentLoaded", function (event) {
      Anchor1 = new AnchorJS();
      Anchor1.add(".load-order");
    });
  }


  /* Button scroll up js */
  $(document).ready(function () {
    var progressPath = document.querySelector(".backtotop-wrap path");
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";
    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 150;
    var duration = 550;
    jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery(".backtotop-wrap").addClass("active-progress");
      } else {
        jQuery(".backtotop-wrap").removeClass("active-progress");
      }
    });
    jQuery(".backtotop-wrap").on("click", function (event) {
      event.preventDefault();
      jQuery("html, body").animate({
        scrollTop: 0
      }, parseInt(duration, 10)); /* Fixing parseInt call with radix parameter */
      return false;
    });
  });









})(jQuery);
