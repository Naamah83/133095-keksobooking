'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  var featureListItems = cardElement.querySelectorAll('.feature');

  map.insertBefore(cardElement, document.querySelector('map__filters-container'));

  var fillFeatures = function (pinData) {
    for (var i = 0; i < featureListItems.length; i++) {
      featureListItems[i].classList.add('hidden');
    }
    for (var j = 0; j < pinData.offer.features.length; j++) {
      cardElement.querySelector('.feature--' + pinData.offer.features[j]).classList.remove('hidden');
    }
  };

  var renderCard = function (pinData) {
    cardElement.querySelector('.map__card h3').textContent = pinData.offer.title;
    cardElement.querySelector('.map__card p small').textContent = pinData.offer.address;
    cardElement.querySelector('.popup__price').textContent = pinData.offer.price + ' ₽/ночь';

    var housingType;
    switch (pinData.offer.type) {
      case 'flat':
        housingType = 'Квартира';
        break;
      case 'house':
        housingType = 'Дом';
        break;
      case 'bungalo':
        housingType = 'Бунгало';
        break;
    }

    cardElement.querySelector('.map__card h4').textContent = housingType;

    var endForRooms = '';
    var endForGuests = '';

    switch (pinData.offer.rooms) {
      case 1:
        endForRooms = 'комната';
        break;
      case 5:
        endForRooms = 'комнат';
        break;
      default:
        endForRooms = 'комнаты';
        break;
    }

    switch (pinData.offer.guests) {
      case 1:
        endForGuests = 'гостя';
        break;
      default:
        endForGuests = 'гостей';
        break;
    }

    cardElement.querySelector('.map__card h4 + p').textContent = pinData.offer.rooms + ' ' + endForRooms + ' для ' + pinData.offer.guests + ' ' + endForGuests;
    cardElement.querySelector('.map__card p:nth-of-type(4)').textContent = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
    cardElement.querySelector('.map__card ul + p').textContent = pinData.offer.description;
    cardElement.querySelector('.popup__avatar').src = pinData.author.avatar;
    fillFeatures(pinData);
  };

  var popup = document.querySelector('.map__card');

  var onPopupEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var closePopup = function () {
    popup.classList.add('hidden');
    window.pin.deselectPin();
    document.removeEventListener('keydown', onPopupEsc);
  };

  var showPopup = function () {
    popup.classList.remove('hidden');
  };

  window.card = {
    renderCard: renderCard,
    onPopupEsc: onPopupEsc,
    closePopup: closePopup,
    showPopup: showPopup
  };
})();
