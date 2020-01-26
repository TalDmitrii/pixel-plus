'use strict';

(function () {
  var page = document.querySelector('body');
  var orderButton = page.querySelector('.js-feedback');
  var modalFormContainer = page.querySelector('.modal-form-js');
  var ESC_CODE = 27;

  if (!orderButton && !modalFormContainer) {
    return;
  }

  var modalForm = modalFormContainer.querySelector('.js-form');
  var inputs = modalForm.querySelectorAll('input');
  var buttonClose = modalFormContainer.querySelector('.modal-button-js');

  // Добавляет обработчик на кнопку для заказа.
  orderButton.addEventListener('click', function(evt) {
    evt.preventDefault();

    showOverlay();
    showModalForm();
  });

  // Показывает форму, добавляет к ней обработчики.
  function showModalForm() {
    modalFormContainer.classList.remove('modal-form--hide');

    if (!modalFormContainer.classList.contains('modal-form--show')) {
      modalFormContainer.classList.add('modal-form--show');
    }

    // Обработчик закрывает форму при клике по кнопке.
    buttonClose.addEventListener('click', onButtonCloseClick);

    // Обработчик закрывает форму по ESC.
    document.addEventListener('keydown', onEscKeydown);
    
    // Обработчик закрывает форму при клике по произвольной области.
    document.addEventListener('click', onWindowClick);
  }
  
  // Скрывает форму.
  function hideModalForm() {
    modalFormContainer.classList.remove('modal-form--show');
    setCustomValue();

    if (!modalFormContainer.classList.contains('modal-form--hide')) {
      modalFormContainer.classList.add('modal-form--hide');
    }
  }

  // Отправляет данные формы.
  modalForm.addEventListener('submit', function (evt) {
    // Сбрасывает стандартное поведение формы.
    evt.preventDefault();

    window.backend.upload(new FormData(modalForm), successUploadForm, errorUploadForm);
  });

  // Функция сообщает о неуспешной попытке загрузки данных.
  function errorUploadForm() {
    // Закрывает форму.
    hideModalForm();

    // Сбрасывает все значения формы.
    setCustomValue();

    // Показывает сообщение об удачной попытке загрузки данных.
    renderMessage(false);
  }

  // Функция сообщает об успешной попытке загрузки данных.
  function successUploadForm() {
    // Закрывает форму.
    hideModalForm();

    // Сбрасывает все значения формы.
    setCustomValue();

    // Показывает сообщение об удачной попытке загрузки данных.
    renderMessage(true);   
  }

  // Сбрасывает все значения формы на начальные.
  function setCustomValue() {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].parentNode.classList.remove('form__input-wrapper--valid');
      inputs[i].parentNode.classList.remove('form__input-wrapper--invalid');
      inputs[i].value = '';
      inputs[i].blur();
    }
  }

  // Создаёт сообщение о загрузке данных из формы, добавляет обработчики закрытия сообщения.
  // @param {bool} isSuccess - Статус сообщения: отправлено или нет.
  function renderMessage(isSuccess) {
    // Создаёт сообщение на основе шаблона в зависимости от статуса 'успешно/неуспешно'.
    window.modalMessage.renderMessage(isSuccess);

    // Обработчик закрывает сообщение об отправке данных по ESC.
    document.addEventListener('keydown', onEscKeydown);

    // Обработчик закрывает сообщение об отправке данных при клике по произвольной области.
    document.addEventListener('click', onWindowClick);

    // Обработчик закрывает сообщение об отправке данных при клике по кнопке.
    window.modalMessage.onButtonClick(onButtonCloseClick);
  }

  // Показывает оверлей, убирает скролл на странице.
  function showOverlay() {
    window.overlay.showOverlay();
    scrollLock.disablePageScroll(modalFormContainer);
  }

  // Скрывает оверлей, добавляет скролл на страницу.
  function removeOverlay() {
    window.overlay.hideOverlay();
    scrollLock.enablePageScroll(modalFormContainer);
  }

  // Закрывает форму по ESC.
  function onEscKeydown(evt) {
    if (evt.keyCode === ESC_CODE) {
      onButtonCloseClick();
    }
  }

  // Закрывает форму при клике по произвольной области.
  function onWindowClick(evt) {
    var target = evt.target;

    if (target.classList.contains('overlay')) {
      onButtonCloseClick();
    }
  }

  // Закрывает форму по клику на кнопку.
  function onButtonCloseClick() {
    setTimeout(removeOverlay, 200);
    setTimeout(hideModalForm, 200);

    window.modalMessage.removeMessage();

    buttonClose.removeEventListener('click', onButtonCloseClick);
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onWindowClick);
  }
})();