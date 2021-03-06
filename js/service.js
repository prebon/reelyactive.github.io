DEFAULT_SOCKET_URL = 'https://www.hyperlocalcontext.com/';
EVENT_HISTORY = 5;

angular.module('service', [ 'ui.bootstrap', 'reelyactive.beaver'])

// Service controller
.controller('ServiceCtrl', function($scope, beaver) {
  $scope.events = [];

  var socket = io.connect(DEFAULT_SOCKET_URL);
  beaver.listen(socket);

  beaver.on('appearance', function(event) {
    updateEvents('appearance', event);
  });
  beaver.on('displacement', function(event) {
    updateEvents('displacement', event);
  });
  beaver.on('keep-alive', function(event) {
    updateEvents('keep-alive', event);
  });
  beaver.on('disappearance', function(event) {
    updateEvents('disappearance', event);
  });

  function updateEvents(type, event) {
    var length = $scope.events.unshift({
      type: type,
      tiraid: event.tiraid
    });
    if (length > EVENT_HISTORY) {
      $scope.events.pop();
    }
    $scope.$apply();
  }
});
