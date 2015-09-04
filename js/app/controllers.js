'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MainController', ['$scope',function($scope) {
  	$scope.a = 10;
  	
  	$scope.config = {
  			zk : 0,  
  			yk1 : 4,  
  			fk1 : 17,  
  			dk1 : 100,  
  			fk2 : 120,  
  			fk3 : 120,  
  			dk3 : 100,  
  			fk4 : 10,
  			magnification: 2.2
  		}
  	
  	var rayPlot = new RayPlot($scope.config);

  	$scope.$watch('config',function (newConfig) {
  		rayPlot.clear();
  		rayPlot.draw($scope.config);

  	},true);

  }]);