var _ = require('lodash');
var d3 = require('d3');
var dagreD3 = require('dagre-d3');
var example = require('./example.json');
var deps = require('./lib/deps');
require('angular/angular');

angular.module("ordnung", []);


angular.
  module("ordnung").
  controller('main', ['$scope', function($scope) {
    $scope.tasks = example;
  }]).
  directive("depchart", function () {
    return {
      restrict: 'E',
      scope: true,
      template: '<pre>{{ tasks | json:2 }}</pre>'
      //    template: '<div><svg id="svg-canvas" width="1024" height="500"></svg></div>'
    };
  });

/*

function trace(id) {
  return deps(example, id).concat([id]);
}

window.onload = function () {

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
  g.graph().rankdir = 'BT';

  g.graph().transition = function(selection) {
    return selection.transition().duration(1000);
  };

  draw();

  window.draw = draw;

  function draw(id) {

    g.nodes().forEach(function (node) {
      g.removeNode(node);
    });

    // Here we're setting nodeclass, which is used by our custom drawNodes function
    // below.

    if (id) {
      var depset = trace(id);
      var filtered = _.filter(example, function (item) {
        return _.contains(depset, item.id);
        //    return item.tags.indexOf('russia') > -1;
      });
    } else {
      var filtered = example;
    }

    filtered.forEach(function (item) {
      g.setNode(item.id, {
        label: item.description + ' (' + item.id + ')'
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
    
    // Run the renderer. This is what draws the final graph.
    render(d3.select("svg g"), g);

  }

};

*/
