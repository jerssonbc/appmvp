'use strict';

app.factory('Tablero',function(FURL,$firebase,$q){
	var ref=new Firebase(FURL);

	var Tablero={
		getTareasParaUsuario:function(uid){
			var defer=$q.defer();

			$firebase(ref.child('usuario_tareas').child(uid))
				.$asArray()
				.$loaded()
				.then(function(tareas){
					defer.resolve(tareas);
				},function(err){
					defer.reject();
				});
			return defer.promise;
		}
	};

	return Tablero;
});