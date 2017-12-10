'use strict';

(function () {

  var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');


  var renderPin = function (pinData) {
    var pinElement = pinsTemplate.cloneNode(true);
    pinElement.style.left = pinData.location.x + 20 + 'px';
    pinElement.style.top = pinData.location.y + 62 + 'px';
    pinElement.querySelector('img').src = pinData.author.avatar;
    return pinElement;
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
