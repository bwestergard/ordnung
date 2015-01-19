require('angular/angular');
var mainController = require('./lib/mainController');
var ngEnter = require('./lib/ngEnter');
var ngBackspace = require('./lib/ngBackspace');
var depchart = require('./lib/depchart');
var initFocus = require('./lib/initFocus');

angular.module('ordnung', ['ng-sortable']).
  controller('main', ['$scope', mainController]).
  directive('ngEnter', ngEnter).
  directive('ngBackspace', ngBackspace).
  directive('initFocus', initFocus).
  directive('depchart', depchart);
