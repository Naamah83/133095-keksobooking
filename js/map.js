'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var popupClose = document.querySelector('.popup__close');
  var card = document.querySelector('.map__card');
  var address = document.querySelector('#address');
  var body = document.querySelector('body');

  var limitYTop = 100;
  var limitYBottom = 500;
  var limitXLeft = body.offsetLeft;
  var limitXRight = body.offsetLeft + body.offsetWidth;
  var ESC_KEYCODE = 27;

  var renderAllPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.length; i++) {
      fragment.appendChild(window.pin.renderPin(window.data[i]));
    }
    return fragment;
  };

  map.appendChild(renderAllPins());

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

  hideElement(card);

  var onPopupEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var closePopup = function () {
    hideElement(card);
    window.pin.removeActivePins();
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
        window.pin.addActivePins(elem);
        window.card.renderCard(window.data[i]);
        showElement(card);
        document.addEventListener('keydown', onPopupEsc);
      });
    });
  };

  mapPinMain.addEventListener('mouseup', activateMap);

  mapPinMain.addEventListener('mousedown', function (event) {
    event.preventDefault();

    var startCoords = {
      x: event.clientX,
      y: event.clientY,
    };

    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();
      var shift = {
        x: startCoords.x - moveEvent.clientX,
        y: startCoords.y - moveEvent.clientY
      };
      startCoords = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };

      var pinPointY = mapPinMain.offsetTop - shift.y;
      var pinPointX = mapPinMain.offsetLeft - shift.x;

      if (pinPointY > limitYBottom) {
        pinPointY = limitYBottom;
      } else if (pinPointY < limitYTop) {
        pinPointY = limitYTop;
      } else {
        pinPointY = mapPinMain.offsetTop - shift.y;
      }

      if (pinPointX > limitXRight) {
        pinPointX = limitXRight;
      } else if (pinPointX < limitXLeft) {
        pinPointX = limitXLeft;
      } else {
        pinPointX = mapPinMain.offsetLeft - shift.x;
      }

      mapPinMain.style.top = pinPointY + 'px';
      mapPinMain.style.left = pinPointX + 'px';

      address.value = pinPointX + ', ' + pinPointY;
    };

    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
