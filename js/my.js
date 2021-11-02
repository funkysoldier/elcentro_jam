
function getMember(){
    setLoader('.content .inner');
    getContent({method: "get", object: "member", params: {email: memberEmail}}, function(data){
        $('.content .inner').html( getMemberView(data) );
    });
}

$(document).ready(function(){
    if (!checkCookie('memberEmail')){
        window.location.href = 'login.html';
    } else {
        memberEmail = getCookie('memberEmail');
        getMember();
    }

    document.querySelector('.header .right button').addEventListener('click', logout);
});