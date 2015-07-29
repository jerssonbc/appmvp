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
  .run( function($rootScope, $location) {
      $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
          $location.path("/login");
        }
      });
    })
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
      .when('/tablero',{
        templateUrl:'views/tablero.html',
        controller:'TableroController',
        resolve:{
          actualAuth:function(Auth){
            return Auth.requiereAuth();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
