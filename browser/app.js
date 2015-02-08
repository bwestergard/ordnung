require('angular/angular');
var mainController = require('./lib/mainController');
var ngEnter = require('./lib/ngEnter');
var ngBackspace = require('./lib/ngBackspace');
var depchart = require('./lib/depchart');
var initFocus = require('./lib/initFocus');
var autocomplete = require('allmighty-autocomplete');

angular.module('ordnung', ['ng-sortable', 'autocomplete']).
  controller('main', ['$scope', mainController]).
  directive('ngEnter', ngEnter).
  directive('ngBackspace', ngBackspace).
  directive('initFocus', initFocus).
  directive('depchart', depchart);
