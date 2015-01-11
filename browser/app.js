var ngEnter = require('./lib/ngEnter');
var ngBackspace = require('./lib/ngBackspace');
var mainController = require('./lib/mainController');
var depchart = require('./lib/depchart');
require('angular/angular');

var ordnung = angular.module('ordnung', ['ng-sortable']);

ordnung.directive('ngEnter', ngEnter);
ordnung.directive('ngBackspace', ngBackspace);

ordnung.controller('main', ['$scope', mainController]);
ordnung.directive('depchart', depchart);
