function getAuthHeader() {
    
    var token = $.cookie("AppSessionId");

    if (token !== '' && token !== null && token !== undefined) {
        $.ajaxSetup({
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', token);
            }
        });
    }
}