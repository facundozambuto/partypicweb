/* 
 * Gorilla | Responsive App Landing Page.
 * Gorilla own jQuery file.
 * Copyright: 2017;
 * Author profile: http://themeforest.net/user/themeshef
 */

;(function () {
    "use strict";
    var $window, $document, $body;

    $window = $(window);
    $document = $(document);
    $body = $("body");
	
	/* preloader */
	/*$window.on('load', function() {
		$('#loader').fadeOut(); // 
		$('#preloader').delay(350).fadeOut('slow'); 
	});*/	

	
    $document.ready(function () {
		
		$("#preloader").hide(3000);
		
		/* ==============================================
		 * Wow js activator
		 * ===============================================*/
		new WOW().init();
		
	  
		/* =============================
		 * Swiper js
		 * ============================*/
		var swiper = new Swiper('.swiper-3d-gallery', {
			pagination: '.swiper-pagination',
			effect: 'coverflow',
			autoplay: 2500,
			grabCursor: true,
			loop: true,
			centeredSlides: true,
			slidesPerView: 'auto',
			coverflow: {
				rotate: 50,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows : true
			}
		});
		
		var swiper = new Swiper('.phone-slide-gallery', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
			spaceBetween: 0,
			slidesPerView: 1,
			grabCursor: true,
			centeredSlides: true,
			autoplay: 2500,
			autoplayDisableOnInteraction: false,
		});
		
		var swiper = new Swiper('.clients-logos', {
			slidesPerView: 6,
			slidesPerColumn: 1,
			grabCursor: true,
			autoplay: 2500,
			paginationClickable: true,
			spaceBetween: 30,
			loop: true
		});
		
		var swiper = new Swiper('.swiper-gallery-normal', {
			pagination: '.swiper-pagination',
			slidesPerView: 4,
			slidesPerColumn: 1,
			grabCursor: true,
			autoplay: 2500,
			paginationClickable: true,
			spaceBetween: 30,
			loop: true
		});
		
		var swiper = new Swiper('.swiper-review', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
			spaceBetween: 30,
			slidesPerView: 1,
			grabCursor: true,
			centeredSlides: true,
			autoplay: 2500,
			autoplayDisableOnInteraction: false,
			loop: true
		});
		
		var swiper = new Swiper('.swiper-gallery-fullwidth', {
			pagination: '.swiper-pagination',
		    slidesPerView: 5,
			autoplay: 2500,
			paginationClickable: true,
			spaceBetween: 30,
			freeMode: true,
			grabCursor: true,
			loop: true
		});
		
		
		/*==============================================
		 Blog Masonry list
		 ===============================================*/
		$('.masonry').isotope({
		  itemSelector: ".masonry-item",
			percentPosition: true,
			layoutMode: "masonry",
			filter: "*"
		});

		/*==============================================
          Scroll to top
         ===============================================*/
        $.scrollUp();

		/* ========================= 
		 * Fitvids js
		 * =======================*/
		$(".main").fitVids();

		/* ========================= 
		 * Ripple Water Effect JS
		 * =======================*/
		$('.water-effect').ripples({
			resolution: 512,
			dropRadius: 20,
			perturbance: 0.04,
		});


		
    }); /*  End of document.ready */
	
	
	/* Hover Popup Modal */
	  var _ouibounce = ouibounce(document.getElementById('ouibounce-modal'), {
		aggressive: true,
		timer: 0,
		callback: function() { console.log(''); }
	  });

	  $('body').on('click', function() {
		$('#ouibounce-modal').hide();
	  });

	  $('#ouibounce-modal .close-popup').on('click', function() {
		$('#ouibounce-modal').hide();
	  });

	  $('#ouibounce-modal .modal').on('click', function(e) {
		e.stopPropagation();
	  });
	
	
	/*==============================================
	 BootStrap Tooltip activate
	 ===============================================*/
	$('[data-toggle="tooltip"]').tooltip(); 
	
	
	/*==============================================
	 parallax jQuery
	 ===============================================*/
	if('scene') {
		var scene = document.getElementById('scene');
		var parallax = new Parallax(scene);	
	}
	
	if ('scene_two') {
		var scene_two = document.getElementById('scene_two');
		var parallax = new Parallax(scene_two);
	}
	
})(jQuery);
