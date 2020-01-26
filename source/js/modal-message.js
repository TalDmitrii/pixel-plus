'use strict';

(function () {
  var page = document.querySelector('body');
  var myMessage;

  function renderMessage(isSuccess) {
    var title;
    var successTitle = 'Отлично!<br> Сообщение отправлено.';
    var errorTitle = 'Ошибка.<br> Попробуйте ещё раз.';
    myMessage = document.createElement('div');
    myMessage.classList.add('modal-message');

    if (isSuccess) {
      title = successTitle;
    } else {
      title = errorTitle;
    }
    
    myMessage.innerHTML = 
      '<div class="modal-message__content">' +
        '<h2 class="modal-message__title">' + title + '</h2>' +
        '<button type="button" class="modal-message__button" title="Закрыть"></button>' +
      '</div>';

    page.appendChild(myMessage);
  }

  function removeMessage() {
    if (myMessage) {
      myMessage.classList.add('modal-message--hide');

      setTimeout(function () {
        page.removeChild(myMessage);
        myMessage = null;
      }, 800);
    }
  }

  function onButtonClick(callback) {
    var buttonClose = myMessage.querySelector('.modal-message__button');

    buttonClose.addEventListener('click', callback);
  }

  window.modalMessage = {
    renderMessage: renderMessage,
    removeMessage: removeMessage,
    onButtonClick: onButtonClick,
  }
})();