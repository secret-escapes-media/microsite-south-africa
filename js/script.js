(function ($, root, undefined) {$(function () {'use strict'; // on ready start
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
//        general
///////////////////////////////////////

  // css tricks snippet - http://css-tricks.com/snippets/jquery/smooth-scrolling/
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    });
  });

  // inserts current year
  $('.js-year').html(new Date().getFullYear());

  // detects touch device
  if ("ontouchstart" in document.documentElement){
    $('html').addClass('touch');
  }

  // searches for specific queryString, returns value or true if empty value
  function getQueryStringByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return true;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  // general image slider
  $('.my-slider').unslider({
    autoplay: true,
    delay: 4000,
    speed: 1500,
    nav: false,
    arrows: false,
    infinite: true
  });


///////////////////////////////////////
//        Navigation
///////////////////////////////////////

  // mobile nav toggle open & close
  $('.js-toggle-mobile-nav').on('click', function(e) {
    $('.mobile-nav').toggleClass('is-open').toggleClass('is-closed');
  });

  // current page nav highlight
  var currentPage = $('body').data('current-page');
  $('.' + currentPage + ' .site-nav__link--' + currentPage).addClass('site-nav__link--current');


///////////////////////////////////////
//      SVG image swap
///////////////////////////////////////

  // finds image with class and swaps .png with .svg in img source string
  if (Modernizr.svgasimg) {
    var svgSwap = $('img.js-svg-swap');
    svgSwap.each( function() {
      var currentSrc = $(this).attr('src'),
          newSrc = currentSrc.replace('.png', '.svg');
      $(this).attr('src', newSrc);
    });
  }


///////////////////////////////////////
//      Youtube thumbnails
///////////////////////////////////////

  // stopped on touch devices
  if ( $('html.touch').length === 0 ) {

    // Loops through all videos on page
    $('.js-youtube-thumbnail').each(function(index, el) {
      var video             = $(this).find('.video__iframe'),
          videoSrc          = video.attr('src'),
          thumbnailImg      = $(this).data('thumbnail-img'),
          thumbnailElement  = '<div class="video__thumbnail" style="background-image: url(\'' + thumbnailImg + '\')"><div class="video__play js-play-video"></div></div>';

      // hide video, but keep aspect ratio
      video.css('visibility', 'hidden');

      // Add thumbnail element to hold image & play button
      $(this).prepend(thumbnailElement);
      var thumbnail   = $(this).find('.video__thumbnail'),
          playButton  = $(this).find('.js-play-video');

      // play button event
        playButton.on('click', function(e) {
          e.preventDefault();
          // add auto play query to iframe
          video.attr('src', videoSrc + '&autoplay=1');
          // fade out iframe and show video
          thumbnail.fadeOut( 175, function() {
            video.css('visibility', 'visible');
          });
        });

    });

    // check for autoplay queryString
    if (getQueryStringByName('autoplay')) {
      console.log('there is query string');
      // play the video
      var video     = $('.js-autoplay .video__iframe'),
          videoSrc  = video.attr('src'),
          thumbnail = video.find('.video__thumbnail');
      // add auto play query to iframe
      video.attr('src', videoSrc + '&autoplay=1');
      // hide thumbnail and show video
      thumbnail.hide();
      video.css('visibility', 'visible');
    }

  }


// ///////////////////////////////////////
// //    Stlyist offer query string
// ///////////////////////////////////////
//
//   if ( !(getQueryStringByName('stylist-offer')) ) {
//     $('.js-stylist-offer').hide();
//   }


///////////////////////////////////////
//      Fade in video overlay
///////////////////////////////////////

$(window).scroll(function(){
  $('.video-background__overlay').css("opacity", 0 + $(window).scrollTop() / 500);
});


///////////////////////////////////////
//      Expand Interview
///////////////////////////////////////

$('.js-interview').hide();
$('.js-expand-interview-toggle').on('click',function(e){
  e.preventDefault();
  // finds closest interview
  var parent = $(this).closest('.interview'),
      interview = $('.js-interview',parent);

  // shows and hides interview
  interview.slideToggle(200);

  // Toggles between the text content
  if ($(this).text() === 'Read Interview') {
    $(this).text('Hide Interview');
  } else {
    $(this).text('Read Interview');
  }
});


// ///////////////////////////////////////
// //      Game
// ///////////////////////////////////////
//
// // setting variables
// var questions       = $('.question'),
//     questionNum     = 0,
//     activeQuestion  = questions[questionNum],
//     activeClass     = 'is-active',
//     luxuryTotal     = 0,
//     adventureTotal  = 0,
//     ukPriceTotal    = 0,
//     saPriceTotal    = 0;
//
// // // hide results content
// $('.game__results, .game__result').hide();
// // $('.game__overlay, .game__questions, .game__result--luxury').hide();
//
// // function for close button. Goes back to previous page
// $('.js-close-game').on('click',function(e) {
//   e.preventDefault();
//   history.back();
// });
//
// // function for reset button. refreshes current page to keep first choice
// $('.js-reset-game').on('click',function(e) {
//   e.preventDefault();
//   window.location.reload();
// });
//
// // checks if question has already been answered with block end of on page
// // string format - ?question=0&answer=adventure
// if ( getQueryStringByName('question') && getQueryStringByName('answer') ) {
//
//   // collect question and answer
//   var answeredQuestion = getQueryStringByName('question'),
//       answeredValue    = getQueryStringByName('answer'),
//       answeredUkPrice  = getQueryStringByName('uk-price'),
//       answeredSaPrice  = getQueryStringByName('sa-price');
//
//   // add answer to the total
//   if (answeredValue === "adventure"){
//     adventureTotal++;
//   } else {
//     luxuryTotal++;
//   }
//
//   // convert string to numbers
//   answeredUkPrice = parseInt(answeredUkPrice, 10);
//   answeredSaPrice = parseInt(answeredSaPrice, 10);
//   // collect the price totals
//   ukPriceTotal += answeredUkPrice;
//   saPriceTotal += answeredSaPrice;
//
//   // removes the answered question from html
//   $(questions[answeredQuestion]).remove();
//   // removes the answered question from the array
//   questions.splice(answeredQuestion, 1);
//   // sets new first question to show
//   activeQuestion = questions[questionNum];
// }
//
// // shows the first question in list
// $(activeQuestion).addClass(activeClass);
//
// // event for when answer is clicked
// $('.option label').on('click', function(e){
//   e.preventDefault();
//
//   var answer = $(this).siblings('input').val(),
//       answerUkPrice = $(this).data('price-uk'),
//       answerSaPrice = $(this).data('price-sa');
//
//   // get value of clicked element & increment each value
//   if ( $(this).siblings('input').val() === "adventure"){
//     adventureTotal++;
//   } else {
//     luxuryTotal++;
//   }
//
//   // collect the price totals
//   ukPriceTotal += answerUkPrice;
//   saPriceTotal += answerSaPrice;
//
//   // remove the current question and show the next
//   $(activeQuestion).removeClass(activeClass);
//   questionNum++;
//   activeQuestion = questions[questionNum];
//   $(activeQuestion).addClass(activeClass);
//
//   // calculates after all questions are answered
//   if ( questionNum >= questions.length ) {
//     if (luxuryTotal > adventureTotal) {
//       $('.game__result--luxury').show();
//     } else {
//       $('.game__result--adventure').show();
//     }
//
//     // calculate and input price differences
//     $('.js-saved-amount').html(ukPriceTotal - saPriceTotal);
//     $('.js-uk-amount').html(ukPriceTotal);
//     $('.js-sa-amount').html(saPriceTotal);
//
//     // shows results and hides everything else
//     $('.game__results').show();
//     $('.game__questions, .game__overlay--top-center, .game__overlay--center').hide();
//   }
// });


///////////////////////////////////////
//      SECRETS
///////////////////////////////////////

$('.js-remove-cover').on('click', function() {
  var parent = $(this).closest('.secret');
  parent.addClass('is-revealed');
  $(this).addClass('removed');
});

///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end