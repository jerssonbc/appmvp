'use strict';

app.controller('AuthController',function($scope,$location,Auth,toaster){
	if(Auth.signedIn()){
		$location.path('/');
	}
	$scope.registro=function(usuario){
		
		Auth.registro(usuario).then(function(){
			toaster.pop('success',"Registro éxitoso");
			//console.log("Registro exitoso!");
			$location.path('/');
		},function(err){
			toaster.pop('error',"Oops, algo va mal!");
			//console.log("Error...");
		});
	};

	$scope.login=function(usuario){
		Auth.login(usuario)
			.then(function(){
				toaster.pop('success',"Logueo éxitoso");
				//console.log("Logueado exitosamente");
				$location.path('/');
			},function(err){
				toaster.pop('error',"Oops, algo va mal!");
				//console.log('Error...');
			});
	};

	$scope.cambiarPassword=function(usuario){
		Auth.cambiarPassword(usuario)
			.then(function(){
				//Resetar form
				$scope.usuario.email='';
				$scope.usuario.oldpass='';
				$scope.usuario.newpass='';
				toaster.pop('success',"Password cambiado exitosamente");
				//console.log('Password cambiado exitosamente');
			},function(err){
				toaster.pop('error',"Oops, algo va mal!");
				//console.log('Error...');
			});
	};

});