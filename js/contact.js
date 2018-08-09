$(function () {

    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "../endpoints/formContacto.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
		    var a = JSON.parse(data);
                    var messageText = a.message;
                    $('#contact-form')[0].reset();
                    grecaptcha.reset();
                    $("#divMensaje").html(messageText);
                    $("#modalSuccess").modal("show");
                }
            });
            return false;
        }
    })
    
     $(".btnConsultar").click(function() {
	 $('html, body').animate({
	     scrollTop: $("#contact").offset().top
	 }, 2000);
     });
     
     function goToContacto() {
     	$('html, body').animate({
	     scrollTop: $("#contact").offset().top
	 }, 2000);
     }
});

function goToContacto() {
     	$('html, body').animate({
	     scrollTop: $("#contact").offset().top
	 }, 2000);
     }