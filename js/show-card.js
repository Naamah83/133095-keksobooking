'use strict';
(function () {
  window.showCard = function (data) {
    window.card.renderCard(data);
    window.card.showPopup();
  };
})();
