'use strict';

app.factory('Tarea',function(FURL,$firebase,Auth){
	var ref=new Firebase(FURL);
	var tareas=$firebase(ref.child('tareas')).$asArray();
	var usuario=Auth.usuario;

	var Tarea={
		all:tareas,

		getTarea:function(tareaId){
			return $firebase(ref.child('tareas').child(tareaId));
		},

		crearTarea:function(tarea){
			tarea.datetime=Firebase.ServerValue.TIMESTAMP;
			return tareas.$add(tarea)
				.then(function(newTarea){
					var obj={
						tareaId:newTarea.key(),
						tipo:true,
						titulo:tarea.titulo
					};
					$firebase(ref.child('usuario_tareas').child(tarea.poster)).$push(obj);
					return newTarea;
			});
		},

		crearTareasDeUsuario:function(tareaId){
			Tarea.getTarea(tareaId)
				.$asObject()
				.$loaded()
				.then(function(tarea){
					var obj={
						tareaId:tareaId,
						tipo:false,
						titulo:tarea.titulo
					};
					return $firebase(ref.child('usuario_tareas').child(tarea.corredor)).$push(obj);
				});
		},

		editTarea:function(tarea){
			var t=this.getTarea(tarea.$id);
			return t.$update({titulo:tarea.titulo, descripcion:tarea.descripcion,total:tarea.total});
		},

		cancelarTarea:function(tareaId){
			var t=this.getTarea(tareaId);
			return t.$update({status:"cancelada"});
		},

		isCreator:function(tarea){
			return (usuario && usuario.provider && usuario.uid===tarea.poster);
		},

		isOpen:function(tarea){
			return tarea.status==="open";
		},

		completaTarea:function(tareaId){
			var t=this.getTarea(tareaId);
			return t.$update({status:'realizada'});
		},

		isAssignee:function(tarea){
			return (usuario && usuario.provider && usuario.uid===tarea.corredor);
		},

		isCompleted:function(tarea){
			return tarea.status==='realizada';
		}


	};
	return Tarea;
});