'use strict';
window.showCard = function (obj) {
  window.card.renderCard(window.data[obj]);
  window.card.showPopup();
};
