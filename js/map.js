'use strict';

(function () {
  var map = document.querySelector('.map');
  var pins = document.querySelector('.map__pins');

  pins.appendChild(window.pin(pinData));
  map.insertBefore(window.card, document.querySelector('map__filters-container'));

  var mapPinMain = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');

  var noticeFormFieldsets = noticeForm.querySelectorAll('.fieldset');
  noticeFormFieldsets.forEach(function (elem) {
    elem.disabled = true;
  });

  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  var activateMap = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    noticeFormFieldsets.forEach(function (elem) {
      elem.disabled = false;
    });

    mapPins.forEach(function (elem, i) {
      window.card(elem);

      elem.addEventListener('click', function () {
        window.pin(elem);
        window.card(cardTemplate);
        window.card(window.pin[i]);
        document.addEventListener('keydown', onPopupEsc);
      });
    });
  };

  mapPinMain.addEventListener('mouseup', activateMap);
})();
