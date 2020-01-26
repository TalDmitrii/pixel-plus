'use strict';

(function () {
  var mySlider = new Swiper('.slider-js', {
    // autoHeight: true,
    slidesPerView: 1,
    // spaceBetween: 50,
    updateOnWindowResize: true,
    loop: true,
    
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
})();
