var _ = require('lodash');
var d3 = require('d3');
var dagreD3 = require('dagre-d3');
var example = require('./example.json');
var deps = require('./lib/deps');

function trace(id) {
  return deps(example, id).concat([id]);
}

window.onload = function () {

  // Create the input graph
  var g = new dagreD3.graphlib.Graph()
    .setGraph({})
    .setDefaultEdgeLabel(function() { return {}; });

  g.graph().nodesep = 20;
  g.graph().ranksep = 80;
  g.graph().rankdir = 'BT';

  // Here we're setting nodeclass, which is used by our custom drawNodes function
  // below.

  var depset = trace(13);
  example = _.filter(example, function (item) {
    return _.contains(depset, item.id);
//    return item.tags.indexOf('russia') > -1;
  });

  example.forEach(function (item) {
    g.setNode(item.id, {
      label: item.description + ' (' + item.id + ')'
    });
  });

  var edges = _.flatten(_.map(example, function (item) {
    return _.map(item.dependencies, function (dependency) {
      return [item.id, dependency];
    });
  }), true);

  edges.forEach(function (edge) {
    g.setEdge(edge[1], edge[0],
              { lineInterpolate: 'linear' });
  });

  // Create the renderer
  var render = new dagreD3.render();

  // Set up an SVG group so that we can translate the final graph.
  var svg = d3.select("svg"),
  svgGroup = svg.append("g");

  // Set up zoom support
  var zoom = d3.behavior.zoom().on("zoom", function() {
    svgGroup.attr("transform", "translate(" + d3.event.translate + ")" +
                  "scale(" + d3.event.scale + ")");
  });
  svg.call(zoom);
  
  // Run the renderer. This is what draws the final graph.
  render(d3.select("svg g"), g);

  // Center the graph
  var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
  svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
  svg.attr("height", g.graph().height + 40);

  g.graph().transition = function(selection) {
    return selection.transition().duration(500);
  };


};
