'use strict';

(function () {
  var overlay = document.querySelector('.overlay');

  if (!overlay) {
    return;
  }

  function showOverlay() {
    overlay.classList.remove('overlay--hide');

    if (!overlay.classList.contains('overlay--show')) {
      overlay.classList.add('overlay--show');
    }
  }
  
  function hideOverlay() {
    overlay.classList.remove('overlay--show');

    if (!overlay.classList.contains('overlay--hide')) {
      overlay.classList.add('overlay--hide');
    }
  }

  window.overlay = {
    showOverlay: showOverlay,
    hideOverlay: hideOverlay,
  }
})();