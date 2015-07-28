'use strict';

app.factory('Comentario',function(FURL,$firebase){
	var ref=new Firebase(FURL);

	var Comentario={
		comentarios:function(tareaId){
			return $firebase(ref.child('comentarios').child(tareaId)).$asArray();
		},

		addComentario:function(tareaId,comentario){
			var tarea_comentarios=this.comentarios(tareaId);
			comentario.datetime=Firebase.ServerValue.TIMESTAMP;
			if(tarea_comentarios){
				return tarea_comentarios.$add(comentario);
			}
		}
	};

	return Comentario;

});