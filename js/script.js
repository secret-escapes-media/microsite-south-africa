// Project specific JS goes here


// ///////////////////////////////////////
// //       In page nav
// ///////////////////////////////////////

function stickNav(){
  var st = $(document).scrollTop();
  var trigger = $('.intro.has-nav');
  var triggerH = $('.intro__content').outerHeight();
  var distance = triggerH + trigger.offset().top;
  var nav = $('.intro__nav .page-nav');

  if( st > distance ){
    nav.addClass('stuck');
  }else{
    nav.removeClass('stuck');
  }
}

if( $('.intro').hasClass('has-nav') ){
  $(document).ready(function() { stickNav(); });
  $(document).scroll(function() { stickNav(); });
}




///////////////////////////////////////
//        Background fade
///////////////////////////////////////


function bgOverlay(){
  var wh = $(window).height();
	var st = $(document).scrollTop();


  if( wh > st ){
  	$('.js-bg-fade ').css({
  		"opacity": ((wh - (st*0.8)) / wh)
  	});
  }else{
    $('.js-bg-fade ').css({"opacity": "0.2"});
  }
}

$(document).scroll(function() {
	bgOverlay();
});
$(document).ready(function() {
	bgOverlay();
});






///////////////////////////////////////
//        Slider
///////////////////////////////////////

$('.my-slider').unslider({
  autoplay: true,
  delay: 4000,
  speed: 1500,
  nav: false,
  arrows: false,
  infinite: true
});