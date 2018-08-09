function abrirGaleria(elemento) {
	var num_thumbnails = $(".gallery-item").children().length;
	var sr = $(elemento).children('img').attr('src');
	var clicked_thumbnail_index = $(elemento).index(this);

	var id_profile = $(elemento).data('id-profile');
	var id_image = $(elemento).data('id-imagen');
	
	var nombre_profile = $(elemento).data('nombre-perfil');
	
	if(num_thumbnails > 1) {
		$('#navGaleria').html('<button type="button" id="btnDeleteImage" data-tooltip="tooltip" data-placement="top" title="Eliminar Imagen" class="btn btn-xs btn-default command-delete" onclick="eliminarImagen()" data-image-id="'+id_image+'" style="float: left;"><span class="fa fa-trash-o"></span></button><button type="button" id="btnBlockUser" data-tooltip="tooltip" data-placement="top" title="Eliminar imagen y bloquear Usuario" class="btn btn-xs btn-default command-block" onclick="bloquearUsuario()" data-user-id="'+id_profile+'" data-image-id="'+id_image+'" data-nombre-usuario="'+nombre_profile+'" style="float: left;"><span class="fa fa-ban"></span></button><button type="button" class="previous btn btn-default">Anterior</button><button type="button" style="margin-right: 4em;" class="next btn btn-default">Siguiente</button>');
	}
	else {
		$('#navGaleria').html('<button type="button" id="btnDeleteImage" data-tooltip="tooltip" data-placement="top" title="Eliminar Imagen" class="btn btn-xs btn-default command-delete" onclick="eliminarImagen()" data-image-id="'+id_image+'" style="float: left;"><span class="fa fa-trash-o"></span></button><button type="button" id="btnBlockUser" data-tooltip="tooltip" data-placement="top" title="Eliminar imagen y bloquear Usuario" class="btn btn-xs btn-default command-block" onclick="bloquearUsuario()" data-user-id="'+id_profile+'" data-image-id="'+id_image+'" data-nombre-usuario="'+nombre_profile+'" style="float: left;"><span class="fa fa-ban"></span></button>');
	}

	var caption = $(elemento).children('img').attr('alt');
	var profile_pic_url = $(elemento).data('profile-img-url');
	
	$("#nombreUsuario").text('Imagen subida por '+nombre_profile);
	$("#imagenUsuario").attr('src', profile_pic_url);
	
	$('#modal-image').attr('src', sr);
	$('h4.modal-image-caption').html(caption);
	$('#myModal').modal('show');

	//***************************
	// Modal Navigation:Next code
	//***************************
	$('button.next').on('click', function() {
		clicked_thumbnail_index += 1;
		
	
		if(clicked_thumbnail_index >= num_thumbnails) {
			clicked_thumbnail_index = 0;
		}
		
		var id_profile = $(".gallery-item").eq(clicked_thumbnail_index).data('id-profile');
		var profile_pic_url = $(".gallery-item").eq(clicked_thumbnail_index).data('profile-img-url');
		var nombre_profile = $(".gallery-item").eq(clicked_thumbnail_index).data('nombre-perfil');
		var id_image = $(".gallery-item").eq(clicked_thumbnail_index).data('id-imagen');
		
		$("#nombreUsuario").text('Imagen subida por '+nombre_profile);
		$("#imagenUsuario").attr('src', profile_pic_url);
		$("#btnDeleteImage").attr('data-image-id', id_image);
		$("#btnBlockUser").attr('data-user-id', id_profile);
		$("#btnBlockUser").attr('data-image-id', id_image);
		$("#btnBlockUser").attr('data-nombre-usuario', nombre_profile);
	
		var next_sibling = $(".gallery-item").eq(clicked_thumbnail_index).children('img').attr('src');
		$('#modal-image').attr('src', next_sibling);
		var next_caption = $(".gallery-item").eq(clicked_thumbnail_index).children('img').attr('alt');
		$('#modal-image').attr('alt', next_caption);
		$('h4.modal-image-caption').html(next_caption);
	});
	
	//***************************
	// Modal Navigation:Previous code
	//***************************
	$('button.previous').on('click', function() {
			clicked_thumbnail_index -= 1;
	
		if(clicked_thumbnail_index < 0) {
			clicked_thumbnail_index = (num_thumbnails - 1);
		}
		
		var id_profile = $(".gallery-item").eq(clicked_thumbnail_index).data('id-profile');
		var profile_pic_url = $(".gallery-item").eq(clicked_thumbnail_index).data('profile-img-url');
		var nombre_profile = $(".gallery-item").eq(clicked_thumbnail_index).data('nombre-perfil');
		var id_image = $(".gallery-item").eq(clicked_thumbnail_index).data('id-imagen');
		
		$("#nombreUsuario").text('Imagen subida por '+nombre_profile);
		$("#imagenUsuario").attr('src', profile_pic_url);
		$("#btnDeleteImage").attr('data-image-id', id_image);
		$("#btnBlockUser").attr('data-user-id', id_profile);
		$("#btnBlockUser").attr('data-image-id', id_image);
		$("#btnBlockUser").attr('data-nombre-usuario', nombre_profile);
	
		var next_sibling = $(".gallery-item").eq(clicked_thumbnail_index).children('img').attr('src');
		$('#modal-image').attr('src', next_sibling);
		var next_caption = $(".gallery-item").eq(clicked_thumbnail_index).children('img').attr('alt');
		$('#modal-image').attr('alt', next_caption);
		$('h4.modal-image-caption').html(next_caption);
	});
}