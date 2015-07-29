'use strict';

app.factory('Oferta',function(FURL,$firebase,$q,Auth,Tarea){

	var ref=new Firebase(FURL);

	var usuario=Auth.usuario;
	var Oferta={
		ofertas:function(tareaId){
			return $firebase(ref.child('ofertas').child(tareaId)).$asArray();
		},

		hacerOferta:function(tareaId,oferta){
			var tarea_ofertas=this.ofertas(tareaId);

			if(tarea_ofertas){
				return tarea_ofertas.$add(oferta);
			}
		},

		isOffered:function(tareaId){
			if(usuario && usuario.provider){
				var d=$q.defer();

				$firebase(ref.child('ofertas').child(tareaId).orderByChild("uid")
						.equalTo(usuario.uid))
						.$asArray()
						.$loaded().then(function(data){
							d.resolve(data.length>0);
						},function(){
							d.reject(false);
						});

				return d.promise;
			}
		},
		isMaker:function(oferta){
			return (usuario && usuario.provider && usuario.uid===oferta.uid);
		},
		getOferta:function(tareaId,ofertaId){
			return $firebase(ref.child('ofertas').child(tareaId).child(ofertaId));
		},
		cancelarOferta:function(tareaId,ofertaId){
			return this.getOferta(tareaId,ofertaId).$remove();
		},
		aceptarOferta:function(tareaId,ofertaId,runnerId){
			var o=this.getOferta(tareaId,ofertaId);
			return o.$update({aceptada:true})
			.then(function(){

				var t=Tarea.getTarea(tareaId);

				return t.$update({status:'asignada',corredor:runnerId});
			})
			.then(function(){
				return Tarea.crearTareasDeUsuario(tareaId);
			});
		}
	};

	return Oferta;

});