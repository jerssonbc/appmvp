'use strict';

app.controller('NavController',function($scope,$location,Auth,toaster){
	$scope.actualUsuario=Auth.usuario;
	$scope.signedIn=Auth.signedIn;

	$scope.logout=function(){
		Auth.logout();
		toaster.pop('success',"Cerrada sesión exitosamente");
		//console.log("Logged out");
		$location.path('/');
	};


});