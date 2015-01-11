require('angular/angular');
var mainController = require('./lib/mainController');
var ngEnter = require('./lib/ngEnter');
var ngBackspace = require('./lib/ngBackspace');
var depchart = require('./lib/depchart');

angular.module('ordnung', ['ng-sortable']).
  controller('main', ['$scope', mainController]).
  directive('ngEnter', ngEnter).
  directive('ngBackspace', ngBackspace).
  directive('depchart', depchart);
