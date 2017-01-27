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

  // rouund number to price
  function priceOutput(amount) {
    var price = parseFloat(Math.round(amount * 100) / 100).toFixed(2);
    return '£' + price;
  }

  // gets cookies & checks for name
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
    }
    return "";
  }


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


///////////////////////////////////////
//      Game
///////////////////////////////////////

var details       = $('.js-details'),
    detailstoggle = $('.js-toggle-details'),
    animationTime = 250,
    option        = $('.js-select'),
    optionOverlay = $('.js-select-overlay'),
    calculate     = $('.js-calculate-game'),
    result        = $('.js-result'),
    resultSaving  = $('.js-result-saving'),
    resultUK      = $('.js-result-uk'),
    resultSA      = $('.js-result-sa');

  // unselects all options & hides results
  optionOverlay.hide();
  result.hide();

  // selects option
  option.on('click', function(e) {
    e.preventDefault();
    // stops if child element is clicked or details are open
    if (e.target !== e.currentTarget || $(this).hasClass('is-open') ) return;
    // toggles classes and shows overlay
    $(this).find('.option__selected').fadeIn(animationTime);
    $(this).addClass('is-selected').removeClass('not-selected');
  });

  // deselects when selected
  optionOverlay.on('click', function(e) {
    e.preventDefault();
    // stops if details are open
    if ($(this).closest('.option').hasClass('is-open')) return;
    // toggles classes and hides overlay
    $(this).fadeOut(animationTime);
    $(this).closest('.option').addClass('not-selected').removeClass('is-selected');
  });

  // toggle show details of the option
  details.hide();
  detailstoggle.on('click', function(e) {
    e.preventDefault();
    var thisOption = $(this).closest('.option');
    // toggles information and icon
    if ($(this).closest('.option').hasClass('is-closed')){
      $(this).next('.js-details').slideDown(animationTime);
      thisOption.removeClass('is-closed').addClass('is-open');
      $(this).removeClass('option__icon--open').addClass('option__icon--close');
    } else {
      $(this).next('.js-details').slideUp(animationTime);
      thisOption.removeClass('is-open').addClass('is-closed');
      $(this).removeClass('option__icon--close').addClass('option__icon--open');
    }
  });

  // calculate saving & show results
  calculate.on('click', function(e){
    e.preventDefault();
    var totalPriceUK  = 0,
        totalPriceSA  = 0,
        totalSaving   = 0;
    // completes if there are options selected
    if ($('.option.is-selected').length > 0 ) {
      // goes through each option and adds to total if selected
      $('.option.is-selected').each(function() {
        totalPriceUK += $(this).data('price-uk');
        totalPriceSA += $(this).data('price-sa');
      });
      // calcualate the total saving compared with the UK
      totalSaving = totalPriceUK - totalPriceSA;
      // output prices to sections on the page
      resultSaving.text(priceOutput(totalSaving));
      resultUK.text(priceOutput(totalPriceUK));
      resultSA.text(priceOutput(totalPriceSA));
      // show the results on page
      result.slideDown(animationTime);
    }
  });


///////////////////////////////////////
//      SECRETS
///////////////////////////////////////

var secret          = $('.secret'),
    secretCover     = $('.js-reveal-secret'),
    secretTitle     = $('.secret__title'),
    secretContent   = $('.secret__content'),
    nextButton      = $('.js-next-secret'),
    activeClass     = 'is-visible',
    secretsRevealed = 'secrets-revealed';

  // check if secrets have been revealed
  if (!(getCookie(secretsRevealed))) {
    // hide and show all of the elements
    secretCover.show();
    secret.hide().filter(":first-child").show();
    secretTitle.hide();
    secretContent.hide();
  }

  // function for revealing the next secret
  function revealSecret(element) {
    $(element).closest('.secret').addClass(activeClass);
    $(element).closest('.secret').find('.secret__title').fadeIn(animationTime);
    $(element).closest('.secret').find('.secret__content').slideDown(animationTime);
    $(element).closest('.secret').find('.secret__cover').slideUp(animationTime);
    // if all are revealed, set cookie so they are revealed on load
    if ($('.secret.is-visible').last().next('.secret').next('.secret').length === 0) {
      // set cookie that all secrets are revealed. removed when client is closed
      document.cookie = secretsRevealed + "=1";
    }
  }

  // on clicking the secret ?
  secretCover.on('click', function() {
    // reveal the secret
    revealSecret(this);
    // show the next secret after the clicked secret is revealed
    window.setTimeout(function(){
      $('.secret.is-visible').last().next('.secret').slideDown(animationTime);
    }, animationTime);
  });


///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end