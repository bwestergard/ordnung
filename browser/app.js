var ngEnter = require('./lib/ngEnter');
var ngBackspace = require('./lib/ngBackspace');
var mainController = require('./lib/mainController');
var depchart = require('./lib/depchart');
require('angular/angular');

angular.module('ordnung', ['ng-sortable']).
  controller('main', ['$scope', mainController]).
  directive('ngEnter', ngEnter).
  directive('ngBackspace', ngBackspace).
  directive('depchart', depchart);
