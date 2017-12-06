'use strict';

window.pin = (function () {
  var pins = document.querySelector('.map__pins');
  var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var pinsDataArray = [];

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
  pins.appendChild(renderAllPins(window.card));
})();
