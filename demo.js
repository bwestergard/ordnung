var _ = require('lodash');
var d3 = require('d3');
var dagreD3 = require('dagre-d3');
var example = require('./example.json');
var deps = require('./lib/deps');
require('angular/angular');

var ordnung = angular.module('ordnung', ['ng-sortable']);

ordnung.
  controller('main', ['$scope', function($scope) {
    window.mainscope = $scope;
    $scope.tasks = example;
    $scope.goal = null;
  }]).
  directive("depchart", function () {

    function trace(tasks, goal) {
      return deps(example, goal).concat([goal]);
    }
/*
      .attr("title", function(v) { return styleTooltip(v, g.node(v).description) })
      .each(function(v) { $(this).tipsy({ gravity: "w", opacity: 1, html: true }); });
*/

    var link = function ($scope, $el, $attrs) {

      // Setup

      // Create the renderer
      var render = new dagreD3.render();

      // Set up an SVG group so that we can translate the final graph.
      var svg = d3.select("svg");
      var svgGroup = svg.append("g");

      // Set up zoom support
      var zoom = d3.behavior.zoom().on("zoom", function() {
        svgGroup.attr("transform", "translate(" + d3.event.translate + ")" +
                      "scale(" + d3.event.scale + ")");
      });
      svg.call(zoom);

      // Create the input graph
      var g = new dagreD3.graphlib.Graph()
        .setGraph({})
        .setDefaultEdgeLabel(function() { return {}; });

      g.graph().nodesep = 20;
      g.graph().ranksep = 80;
      g.graph().rankdir = 'LR';

      g.graph().transition = function(selection) {
        return selection.transition().duration(800);
      };

      $scope.$watch('tasks', update, true);
      $scope.$watch('goal', update);

      function update() {

        g.nodes().forEach(function (node) {
          g.removeNode(node);
        });

        // Here we're setting nodeclass, which is used by our custom drawNodes function
        // below.

        if ($scope.goal) {
          var depset = trace($scope.tasks, $scope.goal);
          var filtered = _.filter($scope.tasks, function (item) {
            return _.contains(depset, item.id);
            //    return item.tags.indexOf('russia') > -1;
          });
        } else {
          var filtered = $scope.tasks;
        }

        filtered.forEach(function (item) {
          g.setNode(item.id, {
            label: item.description,
            id: item.id
          });
        });

        var edges = _.flatten(_.map(filtered, function (item) {
          return _.map(item.dependencies, function (dependency) {
            return [item.id, dependency];
          });
        }), true);

        edges.forEach(function (edge) {
          g.setEdge(edge[1], edge[0],
                    { lineInterpolate: 'linear' });
        });

        if ($scope.goal) {
          d3.select('[id="' + $scope.goal + '"]').classed('selected', true);
        } else {
          d3.selectAll('.node').classed('selected', false);
        }        

        // Run the renderer. This is what draws the final graph.
        render(d3.select("svg g"), g);

        d3.selectAll("svg g.node").on('click', function (d) {
          console.log('click');
          $scope.$apply(function () {
            var parsed = parseInt(d);
            $scope.goal = ($scope.goal === parsed) ?
              null :
              parsed;
          });
        });

      };

    };

    return {
      restrict: 'E',
      scope: true,
      link: link,
      template: '<svg id="svg-canvas" width="2000" height="2000"></svg>'
    };
  });
