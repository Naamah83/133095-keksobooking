'use strict';

(function () {
  var card = document.querySelector('.map__card');

  var showElement = function (elem) {
    elem.classList.remove('hidden');
  };

  window.showCard = function (elem, i) {
    showElement(elem);

    elem.addEventListener('click', function () {
      window.pin.deselectPin();
      window.pin.selectPin(elem);
      window.card.renderCard(window.data[i]);
      showElement(card);
      document.addEventListener('keydown', window.card.onPopupEsc);
    });
  };
})();
