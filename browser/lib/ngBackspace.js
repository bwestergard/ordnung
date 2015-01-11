module.exports = function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 8 && element[0].selectionStart === 0) {
        scope.$apply(function (){
          scope.$eval(attrs.ngBackspace);
        });
        
        event.preventDefault();
      }
    });
  };
};
