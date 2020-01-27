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