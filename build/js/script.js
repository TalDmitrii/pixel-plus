'use strict';

(function () {
  var SUCCESS_RESPONSE_STATUS = 200;

  // Отправляет данные на сервер.
  // @param {object} data - Содержит данные формы, которые будут отправлены на сервер.
  // @param {function} onLoad - Функция обратного вызова, которая срабатывает при успешном выполнении запроса.
  // @param {function} onError - Функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
  function upload(data, onLoad, onError) {
    var URL = 'https://echo.htmlacademy.ru';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_RESPONSE_STATUS) {
        onLoad(xhr.status);
      } else {
        onError(xhr);
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  }

  // Экспортирует в глобальную область видимости функции для взаимодействия с удаленным севером через XHR.
  window.backend = {
    upload: upload
  };
})();

'use strict';

(function () {
  var form = document.querySelector('.js-form');

  if (!form) return;

  var buttonSubmit = form.querySelector('.button-submit-js');
  var inputs = form.querySelectorAll('input');

  // При клике по кнопке, происходит проверка полей на отсутствие значения.
  buttonSubmit.addEventListener('click', function () {
    var emptyInputs = [];

    for (var i = 0; i < inputs.length; i++) {
      // Если поле формы обязятельно для заполнения и не имеет никакого значения.
      if ((inputs[i].required === true) && (inputs[i].value.length === 0)) {
        var inputParent = inputs[i].parentElement;

        if (!inputParent.classList.contains('form__input-wrapper--empty')) {
          inputParent.classList.add('form__input-wrapper--empty');
        }

        emptyInputs.push(inputs[i]);
      }
    }

    // Если пустые поля существуют, удаляет выделяющий класс с их родителей.
    setTimeout(function () {
      if (emptyInputs.length > 0) {
        for (var i = 0; i < emptyInputs.length; i++) {
          var inputParent = emptyInputs[i].parentElement;
          inputParent.classList.remove('form__input-wrapper--empty');
        }
      }
    }, 1000);
  });

  // Обработка полей формы.
  // 
  // Добавляет всем полям формы обработчик события.
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', onInputCheck);
  }

  // Проверяет поля с задержкой, даёт отработать маске полей.
  function onInputCheck(evt) {
    setTimeout(function () {
      // Проверка полей ввода, и смена цвета рамок этих полей, в зависимости от валидности.
      var input = evt.target;
      var inputParent = input.parentElement;

      // Если значение поля верно.
      if (input.validity.valid === true) {
        inputParent.classList.remove('form__input-wrapper--invalid');

        if (!inputParent.classList.contains('form__input-wrapper--valid')) {
          inputParent.classList.add('form__input-wrapper--valid');
        }
      }

      // Если значение поля неверно и оно не пустое.
      if ((input.validity.valid === false) && (input.value.length > 0) ) {
        inputParent.classList.remove('form__input-wrapper--valid');

        if (!inputParent.classList.contains('form__input-wrapper--invalid')) {
          inputParent.classList.add('form__input-wrapper--invalid');
        }
      }

      // Если значение поля стало пустым, удаляет классы статуса поля.
      if (input.value.length === 0) {
        inputParent.classList.remove('form__input-wrapper--invalid');
        inputParent.classList.remove('form__input-wrapper--valid');
      }
    }, 100);
  }
})();
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
