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


var arrElement = cardTemplate.cloneNode(true);
var featureListItems = arrElement.querySelectorAll('.feature');

var renderCard = function (pinData) {
  arrElement.querySelector('.map__card h3').textContent = pinData.offer.title;
  arrElement.querySelector('.map__card p small').textContent = pinData.offer.address;
  arrElement.querySelector('.popup__price').textContent = pinData.offer.price + ' ₽/ночь';

  var socialType;
  switch (pinData.offer.type) {
    case 'flat':
      socialType = 'Квартира';
      break;
    case 'house':
      socialType = 'Дом';
      break;
    case 'bungalo':
      socialType = 'Бунгало';
      break;
  }

  arrElement.querySelector('.map__card h4').textContent = socialType;

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

  arrElement.querySelector('.map__card h4 + p').textContent = pinData.offer.rooms + ' ' + endForRooms + ' для ' + pinData.offer.guests + ' ' + endForGuests;
  arrElement.querySelector('.map__card p:nth-of-type(4)').textContent = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
  arrElement.querySelector('.map__card ul + p').textContent = pinData.offer.description;
  arrElement.querySelector('.popup__avatar').src = pinData.author.avatar;

  var fillFeatures = function () {
    for (var i = 0; i < featureListItems.length; i++) {
      featureListItems[i].classList.add('hidden');
    }
    for (var j = 0; j < pinData.offer.features.length; j++) {
      arrElement.querySelector('.feature--' + pinData.offer.features[j]).classList.remove('hidden');
    }
    return featureListItems;
  };
  fillFeatures();
  return arrElement;
};

map.classList.remove('map--faded');

var pinData = getOffersArr();
pins.appendChild(renderAllPins(pinData));
var arrCard = renderCard(pinData[0]);
map.insertBefore(arrCard, document.querySelector('map__filters-container'));
