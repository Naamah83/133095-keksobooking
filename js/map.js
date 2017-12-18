'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var popupClose = document.querySelector('.popup__close');
  var body = document.querySelector('body');

  var limitYTop = 100;
  var limitYBottom = 500;
  var limitXLeft = body.offsetLeft + 280; // 280 - ширина popup с отступами, чтобы метка не пряталась за popup
  var limitXRight = body.offsetLeft - 35 + body.offsetWidth; // 35 - ширина метки чтобы вся была на карте

  var renderAllPins = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.pin.renderPin(data[i]));
    }
    map.appendChild(fragment);
  };

  var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');

  noticeFormFieldsets.forEach(function (elem) {
    elem.disabled = true;
  });

  var successHandler = function (data) {

    var activateMap = function () {
      map.classList.remove('map--faded');
      renderAllPins(data);
      noticeForm.classList.remove('notice__form--disabled');
      noticeFormFieldsets.forEach(function (elem) {
        elem.disabled = false;
      });

      var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      mapPins.forEach(function (elem, index) {

        elem.addEventListener('click', function () {
          window.pin.deselectPin();
          window.pin.selectPin(elem);
          window.showCard(data[index]);
          document.addEventListener('keydown', window.card.onPopupEsc);
        });
      });
    };
    mapPinMain.addEventListener('mouseup', activateMap);
  };

  window.backend.load(successHandler, window.backend.errorHandler);

  window.card.closePopup();

  popupClose.addEventListener('click', window.card.closePopup);

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

      window.form.address.value = pinPointX + ', ' + pinPointY;
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
