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
