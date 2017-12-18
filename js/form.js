'use strict';

(function () {

  var TIME_VALUES = ['12:00', '13:00', '14:00'];
  var TYPE_VALUES = ['flat', 'bungalo', 'house', 'palace'];
  var MIN_PRICE_VALUES = [1000, 0, 5000, 10000];
  var ROOMS = ['1', '2', '3', '100'];
  var GUESTS = ['1', '2', '3', '0'];

  var noticeForm = document.querySelector('.notice__form');
  var address = noticeForm.querySelector('#address');
  var title = noticeForm.querySelector('#title');
  var type = noticeForm.querySelector('#type');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var price = noticeForm.querySelector('#price');
  var rooms = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncPrices = function (element, value) {
    element.value = value;
    element.min = value;
  };

  var changeCapacityFromRooms = function () {
    var roomsNumber = rooms.value;
    var guestsNumbers = capacity.options;

    for (var i = 0; i < guestsNumbers.length; i++) {
      if (roomsNumber === '100') {
        guestsNumbers[i].disabled = guestsNumbers[i].value !== '100';
        capacity.value = '0';
      } else {
        guestsNumbers[i].disabled = (guestsNumbers[i].value > roomsNumber || guestsNumbers[i].value === '0');
        capacity.value = roomsNumber;
      }
    }
  };

  var resetForm = function () {
    noticeForm.reset();
  };

  timeIn.addEventListener('change', function () {
    window.synchronizeFields(timeIn, timeOut, TIME_VALUES, TIME_VALUES, syncValues);
  }, true);

  timeOut.addEventListener('change', function () {
    window.synchronizeFields(timeOut, timeIn, TIME_VALUES, TIME_VALUES, syncValues);
  }, true);

  type.addEventListener('change', function () {
    window.synchronizeFields(type, price, TYPE_VALUES, MIN_PRICE_VALUES, syncPrices);
  }, true);

  rooms.addEventListener('change', function () {
    window.synchronizeFields(rooms, capacity, ROOMS, GUESTS, syncValues);
    changeCapacityFromRooms(rooms, capacity);
  }, true);

  var formValidation = function (target) {
    target.style.borderColor = '#ed1313';

    if (target.validity.tooShort) {
      target.setCustomValidity('Поле не должно содержать меньше ' + target.minLength + ' символов');
    } else if (target.validity.tooLong) {
      target.setCustomValidity('Поле не должно содержать больше ' + target.maxLength + ' символов');
    } else if (target.validity.rangeUnderflow || target.validity.rangeOverflow) {
      target.setCustomValidity('Число должно быть больше ' + target.min + ' и меньше ' + target.max);
    } else if (target.validity.valueMissing) {
      target.setCustomValidity('Это обязательное поле');
    } else {
      target.style.borderColor = '#b6bbc2';
      target.setCustomValidity('');
    }
  };

  address.addEventListener('invalid', function () {
    formValidation(address);
  });

  title.addEventListener('invalid', function () {
    formValidation(title);
  });

  price.addEventListener('invalid', function () {
    formValidation(price);
  });

  noticeForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(noticeForm), resetForm, window.backend.errorHandler);
    evt.preventDefault();
  }, true);

  window.synchronizeFields(rooms, capacity, ROOMS, GUESTS, syncValues);
  changeCapacityFromRooms(rooms, capacity);

  window.form = {
    address: address
  };
})();
