/***
 * Common JS functions and variables which all pages use.
 * As this is used by all pages, be careful what is put
 * into this file.
 */

loadSettings();
applySettings();

var is_maps_collection = false;

if (user_settings.synced == false) {
    $('#sync-settings-alert').show();
    setTimeout(
        function () {
            syncSettings(function () {
                $('#sync-settings-alert').text('Sync has been completed. Thank you.').addClass('alert-info').removeClass('alert-danger').delay(5000).fadeOut();
            })
        }, 6000
    );
}

$('.close[data-dismiss="alert"]').click(function() {
    $(this).parent().alert('close');
    if (user_settings.disabled_alerts) {
        user_settings.disabled_alerts.push( $(this).parent().attr('id') );
    } else {
        user_settings.disabled_alerts = ['' + $(this).parent().attr('id') + ''];
    }
    saveSettings();
});

$(document).ready(function () {
    for (var i = 1; i < $('.alert-global').length; i++) {
        for (var j = 0; j < user_settings.disabled_alerts.length; j++) {
            if ( user_settings.disabled_alerts.indexOf( $('.alert-global').eq(i).attr('id') ) == -1 ) {
                $('.alert-global').eq(i).alert('');
            }
        }
    }
});

var window_offset = function() { scrollBy(0, -70) };
if (location.hash) window_offset();
window.addEventListener("hashchange", window_offset);

$('[data-toggle="tooltip"]').tooltip()
$('[data-toggle="popover"]').popover()

function output(message, level) {
    if (level == 2) {
        console.error(message);
    } else if (level == 1) {
        console.warn(message);
    } else {
        console.log(message);
    }
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
};
