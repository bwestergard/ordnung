var _ = require('lodash');
var d3 = require('d3');
var dagreD3 = require('dagre-d3');
var example = require('./example.json');

window.onload = function () {

  // Create the input graph
  var g = new dagreD3.graphlib.Graph()
    .setGraph({})
    .setDefaultEdgeLabel(function() { return {}; });

  // Here we're setting nodeclass, which is used by our custom drawNodes function
  // below.

  example.forEach(function (item) {
    console.log(item);
    g.setNode(item.id, {
      label: item.description
    });
  });

  var edges = _.flatten(_.map(example, function (item) {
    return _.map(item.dependencies, function (dependency) {
      return [item.id, dependency];
    });
  }), true);

  console.log(edges);

  edges.forEach(function (edge) {
    g.setEdge(edge[0], edge[1]);
  });

  // Create the renderer
  var render = new dagreD3.render();

  // Set up an SVG group so that we can translate the final graph.
  var svg = d3.select("svg"),
  svgGroup = svg.append("g");

  // Run the renderer. This is what draws the final graph.
  render(d3.select("svg g"), g);

  // Center the graph
  var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
  svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
  svg.attr("height", g.graph().height + 40);

};
