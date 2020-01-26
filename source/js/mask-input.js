'use strict';

(function() {
  if ($('.js-phone-mask').length) {
    $('.js-phone-mask').inputmask({
      "mask": "+7 (999) 999-99-99",
      "placeholder": "+7 (___) ___-__-__",
      "showMaskOnHover": false
    });
  }
})();
