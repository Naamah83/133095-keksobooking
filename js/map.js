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
map.classList.remove('map--faded');

var pins = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('template').content.querySelector('.map__card');

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomAvatar = function () {
  var avatarNumberN = getRandomValue(0, AVATAR.length);
  var avatarNumber = AVATAR.splice(avatarNumberN, 1);
  return 'img/avatars/user' + avatarNumber + '.png';
};

var getRandomFeatures = function () {
  var featuresN = FEATURES.slice();
  var randomLength = getRandomValue(1, featuresN.length);
  var actualFeatures = [];

  for (var i = 0; i < randomLength; i++) {
    var randomN = getRandomValue(0, featuresN.length);
    actualFeatures.push(featuresN[randomN]);
    featuresN.splice(randomN, 1);
  }
  return actualFeatures;
};

var getOffersArr = function () {
  for (var i = 0; i < COUNT; i++) {
    var locationX = getRandomValue(300, 900);
    var locationY = getRandomValue(100, 500);

    var arr = {
      author: {
        avatar: getRandomAvatar()
      },
      offer: {
        title: TITLE.splice(getRandomValue(0, TITLE.length), 1)[0],
        price: getRandomValue(1000, 1000000),
        type: TYPE[getRandomValue(0, TYPE.length)],
        rooms: getRandomValue(1, 5),
        guests: getRandomValue(1, 10),
        checkin: CHECKIN[getRandomValue(0, CHECKIN.length)],
        checkout: CHECKOUT[getRandomValue(0, CHECKOUT.length)],
        features: getRandomFeatures(),
        description: '',
        photos: []
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    arr.offer.address = arr.location.x + ', ' + arr.location.y;
    arrs[i] = arr;
  }
};

var createPinElement = function (arr) {
  var newPinElement = document.createElement('button');

  var positionLeft = arr.location.x + 20;
  var positionTop = arr.location.y + 40;
  newPinElement.style = 'left: ' + positionLeft + 'px;' + 'top: ' + positionTop + 'px;';
  newPinElement.className = 'map__pin';

  var newImgElement = document.createElement('img');

  newImgElement.style = 'width: 40px; height: 40px; draggable: false;';
  newImgElement.src = arr.author.avatar;
  newPinElement.appendChild(newImgElement);

  return newPinElement;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrs.length; i++) {
    fragment.appendChild(createPinElement(arrs[i]));
  }
  pins.appendChild(fragment);
};

getOffersArr();
renderPins();

var socialType = function (arrItem) {
  var type = arrItem.offer.type;
  switch (type) {
    case 'flat':
      type = 'Квартира';
      break;
    case 'house':
      type = 'Дом';
      break;
    case 'bungalo':
      type = 'Бунгало';
      break;
  }
  return type;
};

var fillFeatures = function (arrItem, arrElement) {
  var featureListItems = arrElement.querySelectorAll('.feature');
  for (var i = 0; i < featureListItems.length; i++) {
    featureListItems[i].style.display = 'none';
  }
  for (i = 0; i < arrItem.offer.features.length; i++) {
    arrElement.querySelector('.feature--' + arrItem.offer.features[i]).style.display = 'inline-block';
  }
};

var renderArr = function (arrItem) {
  var arrElement = cardTemplate.cloneNode(true);
  arrElement.querySelector('.map__card h3').textContent = arrItem.offer.title;
  arrElement.querySelector('.map__card p small').textContent = arrItem.offer.address;
  arrElement.querySelector('.popup__price').textContent = arrItem.offer.price + ' ₽/ночь';
  arrElement.querySelector('.map__card h4').textContent = socialType(arrItem);
  arrElement.querySelector('.map__card h4 + p').textContent = arrItem.offer.rooms + ' комнаты для ' + arrItem.offer.guests + ' гостей';
  arrElement.querySelector('.map__card p:nth-of-type(4)').textContent = 'Заезд после ' + arrItem.offer.checkin + ', выезд до ' + arrItem.offer.checkout;
  fillFeatures(arrItem, arrElement);
  arrElement.querySelector('.map__card ul + p').textContent = arrItem.offer.description;
  arrElement.querySelector('.popup__avatar').src = arrItem.author.avatar;
  return arrElement;
};

for (var i = 0; i < arrs.length; i++) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderArr(arrs[i]));
}
map.appendChild(fragment);
