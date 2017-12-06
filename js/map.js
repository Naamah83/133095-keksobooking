'use strict';

(function () {
  var map = document.querySelector('.map');

  var ESC_KEYCODE = 27;
  var mapPinMain = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var popup = document.querySelector('.popup');
  var popupClose = document.querySelector('.popup__close');


  var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');
  noticeFormFieldsets.forEach(function (elem) {
    elem.disabled = true;
  });

  var hideElement = function (elem) {
    elem.classList.add('hidden');
  };

  var showElement = function (elem) {
    elem.classList.remove('hidden');
  };

  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  mapPins.forEach(function (elem) {
    hideElement(elem);
  });

  var activePin;

  var removeActivePins = function (elem) {
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    activePin = elem;
    elem.classList.add('map__pin--active');
  };

  hideElement(popup);

  var onPopupEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    noticeFormFieldsets.forEach(function (elem) {
      elem.disabled = false;
    });

    mapPins.forEach(function (elem, i) {
      showElement(elem);

      elem.addEventListener('click', function () {
        removeActivePins(elem);
        showElement(popup);
        window.card(window.pin[i]);
        document.addEventListener('keydown', onPopupEsc);
      });
    });
  };

  mapPinMain.addEventListener('mouseup', activateMap);

  var closePopup = function () {
    hideElement(popup);
    removeActivePins();

    document.removeEventListener('keydown', onPopupEsc);
  };
  popupClose.addEventListener('click', closePopup);
})();
