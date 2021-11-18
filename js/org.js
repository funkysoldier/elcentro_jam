var tabBar;
var stateSelect;
var members;

function getMembers(){
    setLoader('.content .inner');
    $('.content .filter').html( getRegistrationsFilters() );
    stateSelect = new MDCSelect(document.querySelector(`.content .filter .mdc-select`));
    getContent({object: "member", method: "all", params: null}, function(data){
        if (!data.error) {
            members = data;
            $('.content .inner').html( getRegistrationsView(data) );
        } else
            alert(data.error);
    });
}

$(document).ready(function(){
    if (!checkCookie('memberEmail')){
        window.location.href = '/my/login.html';
    } else {
        memberEmail = getCookie('memberEmail');
        getMembers();
    }

    document.querySelector('.header .right button').addEventListener('click', logout);

    //Material
    tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
    tabBar.activateTab(0);
});