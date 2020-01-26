'use strict';

(function () {
  var page = document.querySelector('body');
  var form = page.querySelector('.page-footer__form');

  if (form === null) return;

  var inputs = form.querySelectorAll('input');
  var overlay = page.querySelector('.overlay');
  var successMessage = page.querySelector('#success').content.querySelector('.success');
  var errorMessage = page.querySelector('#error').content.querySelector('.error');
  var message;
  var closeMessageButton;
  var ESC_CODE = 27; 


  // Отправляет данные формы.
  form.addEventListener('submit', function (evt) {
    // Сбрасывает стандартное поведение формы.
    evt.preventDefault();

    window.backend.upload(new FormData(form), successUploadForm, errorUploadForm);
  });

  // Функция сообщает о неуспешной попытке загрузки данных.
  function errorUploadForm() {
    // Показывает оверлей.
    showOverlay()

    // Показывает сообщение о неудачной попытке загрузки данных.
    renderMessage(false);

    // Сбрасывает все значения формы.
    setCustomValue();
  }

  // Функция сообщает об успешной попытке загрузки данных.
  function successUploadForm() {
    // Показывает оверлей.
    showOverlay()

    // Показывает сообщение об удачной попытке загрузки данных.
    renderMessage(true);

    // Сбрасывает все значения формы.
    setCustomValue();
  }

  // Показывает оверлей, убирает скролл на странице.
  function showOverlay() {
    overlay.classList.remove('overlay--hidden');
    scrollLock.disablePageScroll(page);
  }

  // Скрывает оверлей, добавляет скролл на страницу.
  function removeOverlay() {
    overlay.classList.add('overlay--hidden');
    scrollLock.enablePageScroll(page);
  }

  // Удаляет информационное сообщение.
  function removeMessage() {
    page.removeChild(message);
  }

  // Сбрасывает все значения формы на начальные.
  function setCustomValue() {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
      inputs[i].blur();
    }
  }

  // Создаёт сообщение о загрузке данных из формы, добавляет обработчики закрытия сообщения.
  // @param {object} isSuccess - Статус сообщения: отправлено или нет.
  function renderMessage(isSuccess) {
    // Создаёт сообщение на основе шаблона в зависимости от статуса 'успешно/неуспешно'.
    if (isSuccess) {
      message = successMessage.cloneNode(true);
      closeMessageButton = message.querySelector('.success__button');
    } else if (!isSuccess) {
      message = errorMessage.cloneNode(true);
      closeMessageButton = message.querySelector('.error__buttons');
    }

    // Добавляет сообщение в 'body'.
    page.appendChild(message);

    // Добавляет анимацию сообщения.
    message.classList.add('modal-form--open');

    // Обработчик закрывает сообщение об отправке данных по ESC.
    document.addEventListener('keydown', onCloseMessageKeydown);

    // Обработчик закрывает сообщение об отправке данных при клике по произвольной области.
    document.addEventListener('click', onWindowClick);

    // Обработчик закрывает сообщение об отправке данных при клике по кнопке.
    closeMessageButton.addEventListener('click', onButtonCloseClick);
  }

  // Закрывает сообщение об отправке данных по ESC.
  function onCloseMessageKeydown(evt) {
    if (evt.keyCode === ESC_CODE) {
      message.classList.remove('modal-form--open');
      message.classList.add('modal-form--close');

      setTimeout(removeOverlay, 400);
      setTimeout(removeMessage, 1000);

      document.removeEventListener('keydown', onCloseMessageKeydown);
      document.removeEventListener('click', onWindowClick);
      closeMessageButton.removeEventListener('click', onButtonCloseClick);
    }
  }

  // Закрывает сообщение об отправке данных при клике по произвольной области.
  function onWindowClick(evt) {
    if (evt.target.className === overlay.className) {
      message.classList.remove('modal-form--open');
      message.classList.add('modal-form--close');

      setTimeout(removeOverlay, 400);
      setTimeout(removeMessage, 1000);

      document.removeEventListener('keydown', onCloseMessageKeydown);
      document.removeEventListener('click', onWindowClick);
      closeMessageButton.removeEventListener('click', onButtonCloseClick);
    }
  }

  // Закрывает сообщение об отправке данных по клику.
  function onButtonCloseClick() {
    message.classList.remove('modal-form--open');
    message.classList.add('modal-form--close');

    setTimeout(removeOverlay, 400);
    setTimeout(removeMessage, 1000);

    document.removeEventListener('keydown', onCloseMessageKeydown);
    document.removeEventListener('click', onWindowClick);
    closeMessageButton.removeEventListener('click', onButtonCloseClick);
  }
})();
