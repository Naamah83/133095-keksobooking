'use strict';

(function () {
  var AVATAR = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPE = ['flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var COUNT = 8;

  var pinsDataArray = [];

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
  window.data = getOffersArr();
})();
