'use strict';

var AVATAR = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var COUNT = 8;

var arrs = [];

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

    arrs[i] = {
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
  return arrs;
};

var renderPin = function (arr) {
  var pinElement = pinsTemplate.cloneNode(true);
  pinElement.style.left = arr.location.x + 20;
  pinElement.style.top = arr.location.y + 40;
  pinElement.querySelector('img').src = arr.author.avatar;
  return pinElement;
};

var renderAllPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrs.length; i++) {
    fragment.appendChild(renderPin(arrs[i]));
  }
  return fragment;
};

var renderArr = function (arr) {
  var arrElement = cardTemplate.cloneNode(true);
  arrElement.querySelector('.map__card h3').textContent = arr.offer.title;
  arrElement.querySelector('.map__card p small').textContent = arr.offer.address;
  arrElement.querySelector('.popup__price').textContent = arr.offer.price + ' ₽/ночь';

  var socialType;
  switch (arr.offer.type) {
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

  switch (arr.offer.rooms) {
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

  switch (arr.offer.guests) {
    case 1:
      endForGuests = 'гостя';
      break;
    default:
      endForGuests = 'гостей';
      break;
  }

  arrElement.querySelector('.map__card h4 + p').textContent = arr.offer.rooms + ' ' + endForRooms + ' для ' + arr.offer.guests + ' ' + endForGuests;
  arrElement.querySelector('.map__card p:nth-of-type(4)').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;

  arrElement.querySelectorAll('.feature').forEach(function (item) {
    arrElement.querySelector('.popup__features').removeChild(item);
  });

  arr.offer.features.forEach(function (featureItem) {
    var featuresItem = document.createElement('li');
    featuresItem.classList.add('feature', 'feature--' + featureItem);
    arrElement.querySelector('.popup__features').appendChild(featuresItem);
  });

  arrElement.querySelector('.map__card ul + p').textContent = arr.offer.description;
  arrElement.querySelector('.popup__avatar').src = arr.author.avatar;
  return arrElement;
};

map.classList.remove('map--faded');

var arr = getOffersArr();
pins.appendChild(renderAllPins(arr));
var arrCard = renderArr(arr[0]);
map.insertBefore(arrCard, document.querySelector('map__filters-container'));
