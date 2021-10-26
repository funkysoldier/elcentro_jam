var fieldEmail;

$(document).ready(function () {
    $("#form-login").submit( function( event ) {
        event.preventDefault();
        $("#login-error").html("");
        $("#form-submit").focus();
        let email = $("#email").val();
        let request = new xRequest('member/login', {email: email});
        setLoader("#login-error");
        getContent(request.request, function (data) {
            setLoader("#login-error", false);
            if (data.error) {
                let err = ( data.error ? data.error.message : 'Неправильные данные пользователя!')
                $("#login-error").html("Ошибка: "+ err);
                fieldEmail.valid = false;
                fieldEmail.focus();
                $("#email").select();
            } else {
                document.querySelector('form').reset();
                document.cookie = `memberEmail=${email}`;
                window.location.href = '.';
            }
        });
    });
    
    if (!DEBUG && checkCookie('memberEmail')) {
        memberEmail = getCookie('memberEmail');
        window.location.href = '.';
    }

    // Material 
    fieldEmail = new MDCTextField(document.querySelector('.mdc-text-field'));
});