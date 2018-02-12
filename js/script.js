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
	var st = $(document).scrollTop();
	var wh = $(window).height();

	$('.js-bg-fade ').css({
		"opacity": ((wh - (st/4)) / wh)
	});
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