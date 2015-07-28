'use strict';

app.controller('BuscarController',function($scope,$routeParams,toaster,Tarea,Auth,Comentario,Oferta){

	$scope.buscarTarea='';

	$scope.tareas=Tarea.all;

	$scope.signedIn=Auth.signedIn;

	$scope.listMode=true;

	$scope.usuario=Auth.usuario;

	if($routeParams.tareaId){
		var tarea=Tarea.getTarea($routeParams.tareaId).$asObject();
		$scope.listMode=false;
		setSelectedTarea(tarea);
	}
	function setSelectedTarea(tarea){
		$scope.selectedTarea=tarea;

		if($scope.signedIn()){

			//Checkear si el actual usuario loguedo ha hecho una oferta para la tarea selecionada
			Oferta.isOffered(tarea.$id).then(function(data){
				$scope.ofertada=data;
			});
			$scope.isTareaCreator=Tarea.isCreator;
			$scope.isOpen=Tarea.isOpen;

			$scope.isAssignee=Tarea.isAssignee;
			$scope.isCompleted=Tarea.isCompleted;
		}

		$scope.comentarios=Comentario.comentarios(tarea.$id);
		$scope.ofertas=Oferta.ofertas(tarea.$id);

		$scope.block=false;

		$scope.isOfferMaker=Oferta.isMaker;

	};
	$scope.cancelarTarea=function(tareaId){
		Tarea.cancelarTarea(tareaId).then(function(){
			toaster.pop('success','Esta tarea esta cancelada exitosamente');
		})
	};

	$scope.addComentario=function(){
		var comentario={
			content:$scope.content,
			nombre:$scope.usuario.perfil.nombre,
			gravatar:$scope.usuario.perfil.gravatar
		};

		Comentario.addComentario($scope.selectedTarea.$id,comentario).then(function(){
			$scope.content='';
		});
	};
	$scope.hacerOferta=function(){
		var oferta={
			total:$scope.total,
			uid:$scope.usuario.uid,
			nombre:$scope.usuario.perfil.nombre,
			gravatar:$scope.usuario.perfil.gravatar
		};
		Oferta.hacerOferta($scope.selectedTarea.$id,oferta).then(function(){
			toaster.pop('success','Tu oferta ha sido colocada');
			$scope.total='';
			$scope.block=true;
			$scope.ofertada=true;
		});
	};
	$scope.cancelarOferta=function(ofertaId){
		Oferta.cancelarOferta($scope.selectedTarea.$id,ofertaId).then(function(){
			toaster.pop('success','Tu oferta ha sido cancelada');
			$scope.ofertada=false;
			$scope.block=false;
		});
	};

	$scope.aceptarOferta=function(ofertaId,runnerId){
		Oferta.aceptarOferta($scope.selectedTarea.$id,ofertaId,runnerId).then(function(){
			toaster.pop('success','Oferta esta aceptada');
		});
	};

	$scope.completaTarea=function(tareaId){
		Tarea.completaTarea(tareaId).then(function(){
			toaster.pop('success','Felicitaciones! Tu realizaste esta tarea.');
		});
	};
});