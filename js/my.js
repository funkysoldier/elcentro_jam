const cRequest = "/core/";
// Material Design
const MDCList = mdc.list.MDCList;
const MDCRipple = mdc.ripple.MDCRipple;
const MDCFormField = mdc.formField.MDCFormField;
const MDCCheckbox = mdc.checkbox.MDCCheckbox;
const MDCMenuSurface = mdc.menuSurface.MDCMenuSurface;

const ripples = [].map.call(document.querySelectorAll('.mdc-button'), function(el) {
    return new MDCRipple(el);
});

var DEBUG;

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

$(document).ready(function(){
    let params = (new URL(document.location)).searchParams;
    DEBUG = params.get('debug') == 1;

    $('.content .inner').html('<img src="/img/spinner-x26.gif" title="Загрузка..." />');
    getContent({"method": "get", "object": "member", "params": {"email": "mail4rumata@mail.ru"}}, function(data){
        $('.page .header .title').html( (data[0].name ? `Привет, ${data[0].name}!` : 'Привет!') );
        $('.content .inner').html( getMemberView(data) );
    });
});