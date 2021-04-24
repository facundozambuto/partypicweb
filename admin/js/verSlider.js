function gup(name, url) {
	if (!url) url = location.href
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( url );
	return results == null ? null : results[1];
}


$(document).ready(function(){
	getImagenesByIdEvento();
});
	
function getImagenesByIdEvento() {

	var eventId = gup("eventId", document.URL);
	var requestTime = null;

	$.ajax({
		url:'http://local-api.partypic.com/api/images?eventId='+eventId+'&firstRequest='+true+'&requestTime='+requestTime,
		type: 'GET',
		dataType: 'json',
		success: bindearImagenes,
		error: function(xhr, status, error) {
		  $("#modalError").modal('show');
		  $("#mensajeError").text("Ocurri�� un error. Comunicalo al desarrollador.");
		}
	});
}

function bindearImagenes(data) {

	if(data.length) {
	
		for(i=0;i<data.length;i++) {
			var urlFoto = data[i].path;
			getMeta(urlFoto, data[i]);
		}
		
		Number.prototype.padLeft = function(base,chr){
		   var  len = (String(base || 10).length - String(this).length)+1;
		   return len > 0? new Array(len).join(chr || '0')+this : this;
		}
	  	var d = new Date,
	       		dformat = [ (d.getMonth()+1).padLeft(),
		                    d.getDate().padLeft(),
		                    d.getFullYear()].join('/')+
		                    ' ' +
		                  [ d.getHours().padLeft(),
		                    d.getMinutes().padLeft(),
		                    d.getSeconds().padLeft()].join(':');
		var aux_date = new Date(d + ' GMT +0100');
		
		var time_request = new Date,
	       		time_request = [ aux_date.getFullYear(),
	       			    (aux_date.getMonth()+1).padLeft(),
		                    aux_date.getDate().padLeft()].join('-')
		                    +
		                    ' ' +
		                  [ aux_date.getHours().padLeft(),
		                    aux_date.getMinutes().padLeft(),
		                    aux_date.getSeconds().padLeft()].join(':');
		
		$.cookie('time_request', time_request);	
	
	}
}

var primerCarga = true;

function getMeta(urlFoto, data){
	var dataImg = {
				"height": null,
				"width": null
			};
	$("<img/>",{
		load : function(){
			dataImg.height = this.height;
			dataImg.width = this.width;
			if(dataImg.height > dataImg.width) {
				$("#contenedor-imagenes").append('<li style="display:none;" data-url-imagen="'+urlFoto+'" data-tipo="vertical" data-imagen="'+data.imageId+'" ><div style="height:100vh"></div><div class="contenedor-imagen" style="background-image: url('+urlFoto+'); background-size:cover; height:100vh; width:698px; left:35em;""></div><div class="ns-box ns-other ns-effect-thumbslider ns-type-notice ns-show"><div class="ns-box-inner"><div class="ns-thumb"><img style="width:120px; height:120px" onerror="if (this.src != \'../images/mobile-user.png\'){ this.src = \'../images/mobile-user.png\'; this.width = \'100\'; this.height = \'120\';}" src="'+data.profileImageUrl+'"/></div><div class="ns-content"><p><a href="#">'+data.profileName+'</a></p><p>'+data.comment+'</p></div></div></div></li>');
			}
			else {
				$("#contenedor-imagenes").append('<li style="display:none" data-tipo="horizontal" data-imagen="'+data.imageId+'" ><div class="contenedor-imagen" style="background-image: url('+urlFoto+'); background-size:cover; height:100vh; width: 100%;"></div><div class="ns-box ns-other ns-effect-thumbslider ns-type-notice ns-show"><div class="ns-box-inner"><div class="ns-thumb"><img style="width:120px; height:120px" onerror="if (this.src != \'../images/mobile-user.png\') { this.src = \'../images/mobile-user.png\'; this.width = \'100\'; this.height = \'120\';}" src="'+data.profileImageUrl+'" style="width:120px" /></div><div class="ns-content"><p><a href="#">'+data.profileName+'</a></p><p>'+data.comment+'</p></div></div></div></li>');
			}
			
			if(primerCarga){
			 	iniciarSlider();
			 	primerCarga = false;
			 }
		},
		src  : urlFoto
	});
}

var el;
var cant;
var i;
var slideTime = 10000;

function iniciarSlider(){
	el   = $('ul li');
	cant = el.length;	
	i = 0;
	
	if(el.eq(i).data('tipo') == 'vertical') {
		var urlImagen = el.eq(i).data('url-imagen');
		el.eq(i).children().eq(0).css('backgroundImage','url('+urlImagen+')');
		el.eq(i).children().eq(0).css('background-size', 'cover');
		el.eq(i).children().eq(0).addClass('fondo-vertical');
	}
	el.eq(i).fadeIn(300);
	i++;
	
	setTimeout(function(){verProximoSlide();},slideTime);
}

function verProximoSlide(){
	$(".ns-box.ns-other.ns-effect-thumbslider.ns-type-notice.ns-show").removeClass("ns-show").addClass("ns-hide");
	el.children().eq(1).removeClass('ns-show').addClass('ns-hide');
	el = $('ul li');
	cant = el.length;
	
	if(el.eq(i).data('tipo') == 'vertical') {
		var urlImagen = el.eq(i).data('url-imagen');
		el.eq(i).children().eq(0).css('backgroundImage','url('+urlImagen+')');
		el.eq(i).children().eq(0).css('background-size', 'cover');
		el.eq(i).children().eq(0).addClass('fondo-vertical');
	}
	el.fadeOut(300);
	el.eq(i).children().eq(0).fadeIn(300);
	el.eq(i).fadeIn(300);
	i++;
	
	$('.ns-box').removeClass('ns-hide').addClass('ns-show');
	console.log(i);
	
	if(i >= cant){

		checkearEliminadas().
			done(function(a){
				if(a.length){

				} else {
					i = 0;
				}
			});
		cargarMas()
			.done(function(a){
				if(a.length){

				} else {
					i = 0;
				}
			});
	}
	
	setTimeout(function(){verProximoSlide()},slideTime);
}

function cargarMas(){
	var id_evento = gup("id_evento", document.URL);
	var first_time = 'no';
	var time_request = $.cookie('time_request');
	
	return $.ajax({
		url:'../endpoints/Get_ImagenesByIdEvento.php',
		type: 'POST',
		dataType: 'json',
		data: {id_evento:id_evento, first_time:first_time, time_request:time_request},
		success: bindearImagenes,
		error: function(xhr, status, error) {
		    $("#modalError").modal('show');
		    $("#mensajeError").text("Ocurrió un error. Comunicalo al desarrollador.");
		}
	});
}

function checkearEliminadas() {
	var id_evento = gup("id_evento", document.URL);
	var time_request = $.cookie('time_request');
	
	return $.ajax({
		url:'../endpoints/Get_ImagenesEliminadasByIdEvento.php',
		type: 'POST',
		dataType: 'json',
		data: {id_evento:id_evento, time_request:time_request},
		success: eliminarImagenes,
		error: function(xhr, status, error) {
		    $("#modalError").modal('show');
		    $("#mensajeError").text("Ocurrió un error. Comunicalo al desarrollador.");
		}
	});
}

function eliminarImagenes(data) {
	for(i=0;i<data.length;i++) {
		$('li[data-imagen="' + data[i].id_imagen + '"]').remove();
	}
}