

///////////////////////////////////////
//    POIs modal
///////////////////////////////////////

var modal          = $('.js-modal'),
    modalLaunchBtn = $('.js-open-modal'),
    modalCloseBtn  = $('.js-close-modal');

// opens modal with specific content
function modalOpen(event){
  event.preventDefault();
  // hides all modal content
  $('.modal__content').hide();
  // show specific modal content from element data attribute
  var modalID          = $(event.currentTarget).data('modal-id'),
      modal            = $('#'+modalID),
      modalContent     = $(event.currentTarget).data('modal-item-id'),
      modalContentItem = '.modal__content--' + modalContent;
  $(modalContentItem).show().addClass('is-open');
  // disable scrolling on background content (doesn't work iOS)
  $('body').addClass('disable-scroll');

  // open modal
  modal.fadeIn('250', function(){
    $(this).removeClass('is-closed').addClass('is-open');
  });
}

// closes modal and hides all content
function modalClose(event){
  event.preventDefault();
  // enable scrolling
  $('body').removeClass('disable-scroll');
  // reset scroll position
  // This is a bit hacky, but visually hides the scroll position resetting
  setTimeout(function() {
    $('.modal__content-wrap').scrollTop(0);
  }, 280);
  // close modal with fade
  modal.fadeOut('250', function(){
    $(this).removeClass('is-open').addClass('is-closed');
    // Remove status class from modal content
    $('.modal__content.is-open').removeClass('is-open');
  });
}

// launches modal when offer is clicked
modalLaunchBtn.on('click', function(event) {
  modalOpen(event);
});

// closes modal on close icon click
modalCloseBtn.on('click', function(event) {
  modalClose(event);
});

// closes modal on background click
modal.on('click', function(event) {
  if (event.target !== this){
    return;
  }
  modalClose(event);
});

// closes modal on escape key press
$(document).keyup(function(event) {
   if (event.keyCode == 27) {
     modalClose(event);
    }
});


///////////////////////////////////////
//    Modal Nav - next & previous
///////////////////////////////////////

function launchNextModal(){
  var currentModal          = $('.modal__content.is-open'),
      currentModalCategory  = currentModal.data('content-category'),
      nextModal             = currentModal.next('.modal__content'),
      nextModalCategory     = nextModal.data('content-category'),
      firstModal            = $('.modal__content[data-content-category="'+ currentModalCategory +'"]:first'),
      lastModal             = $('.modal__content[data-content-category="'+ currentModalCategory +'"]:last');

  // hides the current modal
  currentModal.hide().removeClass('is-open');
  // reset scroll position
  $('.modal__content-wrap').scrollTop(0);
  if (nextModal && currentModalCategory === nextModalCategory ) {
    // shows next in category
    nextModal.show().addClass('is-open');
  } else {
    // isn't another modal in category so goes back to beginning
    firstModal.show().addClass('is-open');
  }
}

function launchPreviousModal(){
  var currentModal          = $('.modal__content.is-open'),
      currentModalCategory  = currentModal.data('content-category'),
      previousModal         = currentModal.prev('.modal__content'),
      previousModalCategory = previousModal.data('content-category'),
      firstModal            = $('.modal__content[data-content-category="'+ currentModalCategory +'"]:first'),
      lastModal             = $('.modal__content[data-content-category="'+ currentModalCategory +'"]:last');
  // hides the current modal
  currentModal.hide().removeClass('is-open');
  // reset scroll position
  $('.modal__content-wrap').scrollTop(0);
  if (previousModal && currentModalCategory === previousModalCategory ) {
    // shows next in category
    previousModal.show().addClass('is-open');
  } else {
    // isn't another modal in category so goes back to beginning
    lastModal.show().addClass('is-open');
  }
}

$('.js-modal-nav').on('click', function(event) {
  event.preventDefault();
  var navDirection = $(this).data('nav-direction');

  // checks which button has been clicked and runs function
  switch (navDirection) {
    case 'next':
      launchNextModal();
      break;
    case 'previous':
      launchPreviousModal();
      break;
  }
});

$(document).on('keyup', function(e) {
  if(e.which === 37){
    launchPreviousModal();
  }else if(e.which === 39) {
    launchNextModal();
  }
});
