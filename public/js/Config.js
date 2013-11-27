var GOOMEAPIURL = "http://api.gpsoo.net/v2.0/tool/getAddress";
var GOOMEKEY = "CC2B8B8C63CA4E6F9A89EC732E22E37E";

function GetAddressByGoome(lat, lng) {
    //alert(lat + "   " + lng);
    /*$.getJSON(GOOMEAPIURL + "?callback=?", { accessToken: GOOMEKEY, lng: lng, lat: lat, mapType: "BAIDU" },
    function (data) {
        $('#divMarkerAddress').html(data.address);
    }

    );*/
    var userStatus = parseInt($("#hidStatus").val()); 
    GetAddressByThinkrace(lat, lng, userStatus);
}


function GetAddressByGoomeGoogle(t, lat, lng) {
    /*$.getJSON(GOOMEAPIURL + "?callback=?", { accessToken: GOOMEKEY, lng: lng, lat: lat, mapType: "GOOGLE" },
    function (data) {
        $(t).parent().html(data.address);
    }
    );*/
    GetAddressByThinkraceGoogle(t, lat, lng);
}

var POIAPIURL = "http://poi.gpscar.cn/getpoi.aspx";
var TKKEY = "thinkrace";
function GetAddressByThinkrace(lat, lng, userStatus) {
    $.getJSON(POIAPIURL + "?callback=?", { user: TKKEY, lat: lat, lng: lng, type: "baidu" },
    function (data) {
        var str = data.province + data.city + data.district + data.road;
        if (userStatus == -1 || userStatus == 0) {
            for (var i = 0; i < data.address.length; i++) {
                var distance = (data.address[i].distance * 1000).toFixed(0);
                if (parseFloat(distance) < 100) {
                    str += "/离" + data.address[i].name + "约" + distance + "米";
                } else {
                    str += "/离" + data.address[i].name + "(" + data.address[i].angle + ")" + "约" + distance + "米";
                }
            }
        }
        $('#divMarkerAddress').html(str);
    }

    );
}

function GetAddressByThinkraceGoogle(t, lat, lng) {
    $.getJSON(POIAPIURL + "?callback=?", { user: TKKEY, lat: lat, lng: lng, type: "google" },
    function (data) {
        var str = data.province + data.city + data.district + data.road;
        for (var i = 0; i < data.address.length; i++) {
            var distance = (data.address[i].distance * 1000).toFixed(0);
            str += "/离" + data.address[i].name + distance + "米";
        }
        $(t).parent().html(str);
    }

    );
}