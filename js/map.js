'use strict';

(function () {

  var map = document.querySelector('.map');
  // var pins = document.querySelector('.map__pins');
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var mapPinMain = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');
  var popupClose = document.querySelector('.popup__close');
  var ESC_KEYCODE = 27;

  var renderAllPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.length; i++) {
      fragment.appendChild(window.pin(window.data[i]));
    }
    return fragment;
  };

  mapPins.appendChild(renderAllPins(window.data));

  noticeFormFieldsets.forEach(function (elem) {
    elem.disabled = true;
  });

  var hideElement = function (elem) {
    elem.classList.add('hidden');
  };

  var showElement = function (elem) {
    elem.classList.remove('hidden');
  };

  hideElement(window.card);

  var onPopupEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var closePopup = function () {
    hideElement(window.card);
    document.removeEventListener('keydown', onPopupEsc);
  };

  popupClose.addEventListener('click', closePopup);

  var activateMap = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    noticeFormFieldsets.forEach(function (elem) {
      elem.disabled = false;
    });

    mapPins.forEach(function (elem, i) {
      showElement(elem);

      elem.addEventListener('click', function () {
        window.pin.removeActivePins(mapPins);
        window.card(window.data[i]);
        showElement(window.card);
        elem.classList.add('map__pin--active');
        document.addEventListener('keydown', window.card.onPopupEsc);
      });
    });
  };

  mapPinMain.addEventListener('mouseup', activateMap);
})();
