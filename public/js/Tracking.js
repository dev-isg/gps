var DeviceID = 0;
var TimeZone = "";
var DeviceName = "";
var forTimer = 10000;
var forTimeSecond = null;
var language = "zh-cn";
var iconType = "1";

$(document).ready(function () {

    var title = "Tracking:";
    language = $("#hidLanguage").val();
    DeviceName = $("#hidDeviceName").val();
    iconType = parseInt($("#hidIcon").val());
    document.title = title + DeviceName;
    syncSize();
    initmap();

    DeviceID = $("#hidDeviceID").val();
    TimeZone = $("#hidTimeZone").val();

    ajaxGetTracking();
});

window.onresize = syncSize;

function syncSize() {
    var h = $(this).height() - 0;
    var w = $(this).width() - 0;
    $("#map_canvas").css("height", h + "px");
    $("#map_canvas").css("width", w + "px");
}

var isFortime = false;
function forTimeMethod() {

    $("#spanSecond").html(forTimer / 1000);
    forTimeSecond = setInterval(second, 1000);
}

var secondIndex = 1;
function second() {

    var s = forTimer / 1000 - secondIndex;
    $("#spanSecond").html(s);
    secondIndex++;
    if (s == 1) {
        ajaxGetTracking();
        secondIndex = 0;
    }

}


function ajaxGetTracking() {
    $.ajax({
        type: "post",
        url: "Ajax/DevicesAjax.asmx/GetTracking",
        contentType: "application/json",
        data: "{DeviceID:" + DeviceID + ",TimeZone:'" + TimeZone + "'}",
        dataType: "json",
        success: function (result) {
            if (result.d != "" && result.d != "{}") {
                var json = eval("(" + result.d + ")"); 
                showMarker(json);
            }
        }
    });
}

//轨迹总里程(米),上一个轨迹点的经纬度
var allDistance = 0, lastDistanceLat = null, lastDistanceLng = null;
function GetPopupHtml(lk, lat, lng) {

    var html = [];
    html.push("<b>" + DeviceName + "</b><br />");
    html.push(lk.deviceUtcDate + "<br />");
    var disStr = allPage.m;
    var showDistance = 0;
    if (lastDistanceLat) {
        var distance = parseFloat(GetDistance(lastDistanceLat, lastDistanceLng, lat, lng)); //单位米
        allDistance += distance;
        if (allDistance < 1000) {
            disStr = allPage.m;
            showDistance = allDistance;
        } else {
            showDistance = (allDistance / 1000);
            disStr = allPage.km;
        }
        showDistance = showDistance.toFixed(2);
    }
    html.push(allPage.distance2 + ":" + showDistance + disStr + "<br />");
    html.push(allPage.lat + ":" + lat + ",");
    html.push(allPage.lng + ":" + lng + "<br />");
    var courseName = GetCoureName(lk.course);
    html.push(allPage.drection + ":" + courseName + "," + allPage.speed + ":" + lk.speed + allPage.speedKM);
    html.push('<br />&nbsp;&nbsp;');
    lastDistanceLat = lat;
    lastDistanceLng = lng;
    return html.join('');
}