'use strict';

var app = angular
  .module('TaskNinjaApp', [
    'ngAnimate',
    'ngResource',    
    'ngRoute',    
    'firebase',
    'toaster',
    'angularMoment'
  ])
  .constant('FURL', 'https://appmvp.firebaseio.com/')  
  .config(function ($routeProvider) {
    $routeProvider      
      .when('/', {
        templateUrl: 'views/buscar.html',
        controller:'BuscarController'        
      })
      .when('/login',{
        templateUrl: 'views/login.html',
        controller:'AuthController'
      })
      .when('/registro',{
        templateUrl: 'views/registro.html',
        controller:'AuthController'
      })
      .when('/buscar/:tareaId',{
        templateUrl: 'views/buscar.html',
        controller:'BuscarController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
