'use strict';

(function () {

  var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var pinsDataArray = window.data.pinsDataArray;

  var renderPin = function (pinData) {
    var pinElement = pinsTemplate.cloneNode(true);
    pinElement.style.left = pinData.location.x + 20 + 'px';
    pinElement.style.top = pinData.location.y + 62 + 'px';
    pinElement.querySelector('img').src = pinData.author.avatar;
    return pinElement;
  };

  var renderAllPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinsDataArray.length; i++) {
      fragment.appendChild(renderPin(pinsDataArray[i]));
    }
    return fragment;
  };

  var activePin;

  var removeActivePins = function (elem) {
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    activePin = elem;
    elem.classList.add('map__pin--active');
  };

  window.pin = function (pinData) {
    renderPin(pinData);
    removeActivePins();
  };
})();
