'use strict';

var AVATAR = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var COUNT = 8;

var pinsDataArray = [];

var map = document.querySelector('.map');

var pins = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');
var cardElement = cardTemplate.cloneNode(true);
var featureListItems = cardElement.querySelectorAll('.feature');

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getNonrepeatingRandomValue = function (array) {
  return array.splice(Math.floor(Math.random() * array.length), 1);
};

var getOffersArr = function () {
  for (var i = 0; i < COUNT; i++) {
    var locationX = getRandomValue(300, 900);
    var locationY = getRandomValue(100, 500);

    pinsDataArray[i] = {
      author: {
        avatar: 'img/avatars/user' + getNonrepeatingRandomValue(AVATAR) + '.png'
      },
      offer: {
        title: getNonrepeatingRandomValue(TITLE),
        address: locationX + ', ' + locationY,
        price: getRandomValue(1000, 1000000),
        type: TYPE[getRandomValue(0, TYPE.length)],
        rooms: getRandomValue(1, 5),
        guests: getRandomValue(1, 10),
        checkin: CHECKIN[getRandomValue(0, CHECKIN.length)],
        checkout: CHECKOUT[getRandomValue(0, CHECKOUT.length)],
        features: FEATURES.slice(0, getRandomValue(1, FEATURES.length)),
        description: '',
        photos: []
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }
  return pinsDataArray;
};

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

var pinData = getOffersArr();
pins.appendChild(renderAllPins(pinData));
renderCard(pinData[0]);
map.insertBefore(cardElement, document.querySelector('map__filters-container'));

var ESC_KEYCODE = 27;
var mapPinMain = map.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');
var popup = document.querySelector('.popup');
var popupClose = document.querySelector('.popup__close');

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

var activePins;

var removeActivePins = function (elem) {
  if (activePins) {
    activePins.classList.remove('map__pin--active');
  }
  activePins = elem;
  elem.classList.add('map__pin--active');
};

hideElement(popup);

var onPopupEsc = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var activateMap = function () {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  noticeFormFieldsets.forEach(function (elem) {
    elem.disabled = false;
  });

  mapPins.forEach(function (elem, i) {
    showElement(elem);

    elem.addEventListener('click', function () {
      removeActivePins(elem);
      showElement(popup);
      renderCard(pinsDataArray[i]);
      document.addEventListener('keydown', onPopupEsc);
    });
  });
};

mapPinMain.addEventListener('mouseup', activateMap);

var closePopup = function () {
  hideElement(popup);
  removeActivePins();

  document.removeEventListener('keydown', onPopupEsc);
};
popupClose.addEventListener('click', closePopup);
