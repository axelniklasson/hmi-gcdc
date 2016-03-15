var appModule = angular.module('hmiApp', []);

appModule.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

appModule.controller('DataController', ['$scope', 'socket', function($scope, socket) {

    $scope.velocity = 0;
    $scope.acceleration = 0;
    $scope.xCoord = 0;
    $scope.yCoord = 0;

    socket.on('data', function(msg) {
        $scope.velocity = msg[0];
        $scope.acceleration = msg[1];
        $scope.xCoord = msg[2];
        $scope.yCoord = msg[3];
    });
}]);