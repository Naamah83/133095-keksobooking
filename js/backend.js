'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var TIME_OUT = 7000;
  var CODE_SUCSESS = 200;

  var ErrorMessages = {
    400: 'Неверный запрос',
    401: 'Требуется авторизация',
    404: 'Страница не найдена',
    500: 'Ошибка сервера'
  };

  var setup = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCSESS) {
        onSuccess(xhr.response);
      } else {
        onError(ErrorMessages[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания ответа. Проверьте интеренет соединение.');
    });
    xhr.timeout = TIME_OUT;
    return xhr;
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = setup(onSuccess, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },

    save: function (data, onSuccess, onError) {
      var xhr = setup(onSuccess, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },

    errorHandler: function (errorMessage) {
      var message = document.createElement('div');
      message.style = 'z-index: 100; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; padding: 30px; text-align: center; font-size: 30px; color: white; border: 1px solid black; background-color: #c37070';
      message.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', message);
    }
  };
})();
