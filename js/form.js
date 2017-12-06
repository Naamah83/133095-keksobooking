'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var address = noticeForm.querySelector('#address');
  var title = noticeForm.querySelector('#title');
  var type = noticeForm.querySelector('#type');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var price = noticeForm.querySelector('#price');
  var rooms = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  var minPrices = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};

  type.addEventListener('change', function (evt) {
    var target = evt.target;
    price.min = minPrices[type.value];
    price.value = minPrices[target.value];
  });

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

  rooms.addEventListener('change', function () {
    changeCapacityFromRooms(rooms, capacity);
  });

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
})();
