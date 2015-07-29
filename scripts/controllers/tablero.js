'use strict';

app.controller('TableroController',function($scope,Tablero,Auth){
	$scope.tareasRunner=[];
	$scope.tareasPoster=[];

	var uid=Auth.usuario.uid;

	Tablero.getTareasParaUsuario(uid).then(function(tareas){
		for(var i=0; i<tareas.length;i++){
			tareas[i].tipo ? $scope.tareasPoster.push(tareas[i]):$scope.tareasRunner.push(tareas[i])
		}

		$scope.numPoster=$scope.tareasPoster.length;
		$scope.numRunner=$scope.tareasRunner.length;
	});

});