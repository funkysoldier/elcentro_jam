
function getMember(){
    setLoader('.content .inner');
    getContent({method: "get", object: "member", params: {email: memberEmail}}, function(data){
        $('.content .inner').html( getMemberView(data) );
    });
}

function logout(){
    document.cookie = 'memberEmail=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.location.href = 'login.html';
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