function openGallery(elemento) {
	var num_thumbnails = $(".gallery-item").children().length;
	var sr = $(elemento).children('img').attr('src');
	var clicked_thumbnail_index = $(elemento).index(this);

	var profileId = $(elemento).data('id-profile');
	var imageId = $(elemento).data('id-image');
	
	var profileName = $(elemento).data('profile-name');
	
	if (num_thumbnails > 1) {
		$('#navGallery').html('<button type="button" id="btnDeleteImage" data-tooltip="tooltip" data-placement="top" title="Eliminar Imagen" class="btn btn-xs btn-default command-delete" onclick="deleteImage()" data-image-id="'+imageId+'" style="float: left;"><span class="fa fa-trash-o"></span></button><button type="button" id="btnBlockProfile" data-tooltip="tooltip" data-placement="top" title="Eliminar imagen y bloquear Usuario" class="btn btn-xs btn-default command-block" onclick="blockProfile()" data-user-id="'+profileId+'" data-image-id="'+imageId+'" data-nombre-usuario="'+profileName+'" style="float: left;"><span class="fa fa-ban"></span></button><button type="button" class="previous btn btn-default">Anterior</button><button type="button" style="margin-right: 4em;" class="next btn btn-default">Siguiente</button>');
	} else {
		$('#navGallery').html('<button type="button" id="btnDeleteImage" data-tooltip="tooltip" data-placement="top" title="Eliminar Imagen" class="btn btn-xs btn-default command-delete" onclick="deleteImage()" data-image-id="'+imageId+'" style="float: left;"><span class="fa fa-trash-o"></span></button><button type="button" id="btnBlockProfile" data-tooltip="tooltip" data-placement="top" title="Eliminar imagen y bloquear Usuario" class="btn btn-xs btn-default command-block" onclick="blockProfile()" data-user-id="'+profileId+'" data-image-id="'+imageId+'" data-nombre-usuario="'+profileName+'" style="float: left;"><span class="fa fa-ban"></span></button>');
	}

	var caption = $(elemento).children('img').attr('alt');
	var profile_pic_url = $(elemento).data('profile-img-url');
	
	$("#userName").text('Imagen subida por ' + profileName);
	$("#userImage").attr('src', profile_pic_url);
	
	$('#modal-image').attr('src', sr);
	$('h4.modal-image-caption').html(caption);
	$('#myModal').modal('show');

	//***************************
	// Modal Navigation:Next code
	//***************************
	$('button.next').on('click', function() {
		clicked_thumbnail_index += 1;
	
		if (clicked_thumbnail_index >= num_thumbnails) {
			clicked_thumbnail_index = 0;
		}
		
		var profileId = $(".gallery-item").eq(clicked_thumbnail_index).data('id-profile');
		var profile_pic_url = $(".gallery-item").eq(clicked_thumbnail_index).data('profile-img-url');
		var profileName = $(".gallery-item").eq(clicked_thumbnail_index).data('profile-name');
		var imageId = $(".gallery-item").eq(clicked_thumbnail_index).data('id-image');
		
		$("#userName").text('Imagen subida por '+profileName);
		$("#userImage").attr('src', profile_pic_url);
		$("#btnDeleteImage").attr('data-image-id', imageId);
		$("#btnBlockProfile").attr('data-user-id', profileId);
		$("#btnBlockProfile").attr('data-image-id', imageId);
		$("#btnBlockProfile").attr('data-nombre-usuario', profileName);
	
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
	
		if (clicked_thumbnail_index < 0) {
			clicked_thumbnail_index = (num_thumbnails - 1);
		}
		
		var profileId = $(".gallery-item").eq(clicked_thumbnail_index).data('id-profile');
		var profile_pic_url = $(".gallery-item").eq(clicked_thumbnail_index).data('profile-img-url');
		var profileName = $(".gallery-item").eq(clicked_thumbnail_index).data('profile-name');
		var imageId = $(".gallery-item").eq(clicked_thumbnail_index).data('id-image');
		
		$("#userName").text('Imagen subida por '+profileName);
		$("#userImage").attr('src', profile_pic_url);
		$("#btnDeleteImage").attr('data-image-id', imageId);
		$("#btnBlockProfile").attr('data-user-id', profileId);
		$("#btnBlockProfile").attr('data-image-id', imageId);
		$("#btnBlockProfile").attr('data-nombre-usuario', profileName);
	
		var next_sibling = $(".gallery-item").eq(clicked_thumbnail_index).children('img').attr('src');
		$('#modal-image').attr('src', next_sibling);
		var next_caption = $(".gallery-item").eq(clicked_thumbnail_index).children('img').attr('alt');
		$('#modal-image').attr('alt', next_caption);
		$('h4.modal-image-caption').html(next_caption);
	});
}