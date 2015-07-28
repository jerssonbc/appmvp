'use strict';

app.controller('TareaController',function($scope,$location,toaster,Tarea,Auth){
	$scope.crearTarea=function(){
		$scope.tarea.status='open';
		$scope.tarea.gravatar=Auth.usuario.perfil.gravatar;
		$scope.tarea.nombre=Auth.usuario.perfil.nombre;
		$scope.tarea.poster=Auth.usuario.uid;

		Tarea.crearTarea($scope.tarea)
			.then(function(ref){
				toaster.pop('success','Tarea creada exitosamente.');
				$scope.tarea={titulo:'',descripcion:'',total:'',status:'open',gravatar:'',name:'',poster:''};
				$location.path('/buscar/'+ref.key());

			});
	};

	$scope.editarTarea=function(tarea){
		Tarea.editTarea(tarea).then(function(){
			toaster.pop('success','Tarea esta actualizada.');
		});
	};
});