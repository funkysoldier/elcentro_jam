const cRequest = "/core/";
// Material Design
const MDCList = mdc.list.MDCList;
const MDCRipple = mdc.ripple.MDCRipple;
const MDCTabBar = mdc.tabBar.MDCTabBar;
const MDCSelect = mdc.select.MDCSelect;
const MDCFormField = mdc.formField.MDCFormField;
const MDCTextField = mdc.textField.MDCTextField;
const MDCCheckbox = mdc.checkbox.MDCCheckbox;
const MDCMenuSurface = mdc.menuSurface.MDCMenuSurface;

const ripples = [].map.call(document.querySelectorAll('.mdc-button'), function(el) {
    return new MDCRipple(el);
});

class xRequest {
    constructor(name, params) {
        let r = name.split('/');
        this.object = r[0];
        this.method = r[1];
        this.params = params;
        this.request = {object: this.object, method: this.method, params: this.params};
    }
}

var DEBUG;
var memberEmail;

function getContent(request, callback) {
    if (DEBUG)
        console.log('request', request)
    $.post(cRequest, {"request": request}, function (data, textStatus, jqXHR) {
        if (DEBUG)
            console.log('response', data);
        let result = (data ? JSON.parse(data) : null);
        if (callback)
            callback(result);
    });
}

function setLoader(selector, set = true){
    let html = (set ? '<img src="/img/spinner-x26.gif" title="Загрузка..." />' : '');
    $(selector).html(html);
}

function checkCookie(coo){
    return (document.cookie.split(';').filter(
        function(item) {
            return item.trim().indexOf(`${coo}=`) == 0
        }).length > 0);
}

function getCookie(coo){
    let re = new RegExp(`(?:(?:^|.*;\\s*)${coo}\\s*\\=\\s*([^;]*).*$)|^.*$`)
    return document.cookie.replace(re, "$1");
}

function logout(){
    document.cookie = 'memberEmail=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.location.href = 'login.html';
}

$(document).ready(function(){
    let params = (new URL(document.location)).searchParams;
    DEBUG = params.get('debug') == 1;
});