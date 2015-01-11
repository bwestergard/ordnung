var _ = require('lodash');
var example = require('../example.json');

module.exports = function($scope) {
  $scope.tasks = example;
  $scope.goal = null;

  $scope.addDependency = function (task) {
    var id = _.max(_.pluck($scope.tasks, 'id')) + 1;
    $scope.tasks.push({
      'id': id,
      'description': 'New Item',
      "dependencies": []
    });
    task.dependencies.push(id);
  };

  $scope.deleteTask = function (dead_task) {
    $scope.tasks.forEach(function (task) {
      _.pull(task.dependencies, dead_task.id);
    });
    $scope.tasks = _.filter($scope.tasks, function (task) {
      return task.id != dead_task.id;
    });
  };

}
