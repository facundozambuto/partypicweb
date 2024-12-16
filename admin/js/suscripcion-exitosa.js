$(document).ready(function () {
    
    const urlParams = new URLSearchParams(window.location.search);
    const externalRef = urlParams.get("externalRef");

    if (externalRef) {
        
        $("#loadingDivContainer").show();
        $("#successMessage, #errorMessage").hide();

        $.ajax({
            url: `https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/subscriptions/confirm?externalReference=` + externalRef,
            type: "GET",
            contentType: "application/json",
            data: { externalReference: externalRef },
            success: function (response) {
                $("#loadingDivContainer").hide();
                $("#successMessage").show();
            },
            error: function (xhr, status, error) {
                $("#loadingDivContainer").hide();
                $("#errorMessage").show();
            }
        });
    } else {
        $("#loadingDivContainer").hide();
    }
});
