'use strict';

(function () {
  var mySlider = new Swiper('.slider-js', {
    slidesPerView: 1,
    effect: 'fade',
    updateOnWindowResize: true,
    loop: true,

    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
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
