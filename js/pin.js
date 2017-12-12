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

  var addActivePins = function (elem) {
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    activePin = elem;
    elem.classList.add('map__pin--active');
  };

  var removeActivePins = function () {
    if (activePin !== null) {
      activePin.classList.remove('map__pin--active');
    }
  };

  window.pin = {
    renderPin: renderPin,
    removeActivePins: removeActivePins,
    addActivePins: addActivePins
  };
})();
