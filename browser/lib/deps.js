var _ = require('lodash');
var DepGraph = require('dependency-graph').DepGraph;

module.exports = function(tasks, goal) {
  return dependenciesOfItem(tasks, goal).concat([goal]);
}

function dependenciesOfItem(items, id) {
  var graph = new DepGraph();

  items.forEach(function (item) {
    graph.addNode(item.id.toString());
  });

  items.forEach(function (item) {
    item.dependencies.forEach(function (dep) {
      graph.addDependency(item.id.toString(), dep.toString());
    });
  });

  return graph.dependenciesOf(id).map(function (x) {
    return parseInt(x);
  });
};
