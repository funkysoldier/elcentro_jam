const cRequest = "/core/core/index.php";
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
        if (callback)
            callback(data);
    });
}

$(document).ready(function(){
    let params = (new URL(document.location)).searchParams;
    DEBUG = params.get('debug') == 1;

    getContent({"method": "get", "object": "member", "params": null});
});