var tabBar;

$(document).ready(function(){
    if (!checkCookie('memberEmail')){
        window.location.href = '/my/login.html';
    } else {
        memberEmail = getCookie('memberEmail');
    }

    document.querySelector('.header .right button').addEventListener('click', logout);

    //Material
    tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
    tabBar.activateTab(0);
});