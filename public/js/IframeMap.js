var map = null;
var UserId = null;
var isShowDeviceName = true;
var forTimer = 10000;
var forTimeSecond = null;
var isFortime = false;
var language = "zh-cn";
var showPopupmarker = null; //信息弹出框
var showPopupmarkerID = 0;
var status = 0;
var timeZone = "";

$(document).ready(function () {
    language = $("#hidLanguage").val();
    timeZone = $("#hidTimeZone").val();
    status = parseInt($("#hidStatus").val());
    addSelMap();
    UserId = $("#hidUserID").val();
    syncSize();
    initmap();
    init();
    $("#divLeftMenu").bind("mouseleave", hideMoreItems);
    //加载全部车辆
    is1 = true;
    parent.getGroup();
});

function init() {
    document.onmousemove = mouseMove;
}


var mouseleft = 0;
var mousetop = 0;

function mouseMove(e) {
    if (!document.all) {

        mouseleft = e.pageX;
        mousetop = e.pageY;
    } else {
        mouseleft = document.body.scrollLeft + event.clientX;
        mousetop = document.body.scrollTop + event.clientY;
    }

}


function addSelMap() {
    var language = $("#hidLanguage").val();
    var optGoogle = '<option value="Google">' + iframeMapPage.googleMap + '</option>';
    $('#selMap').append(optGoogle);
    if (language == "zh-cn") {
        var optBaidu = '<option value="Baidu">' + iframeMapPage.baiduMap + '</option>';
        var optGaode = '<option value="Gaode">' + '高德地图' + '</option>';
        var optSOSO = '<option value="soso">' + '搜搜地图' + '</option>';
        $('#selMap').append(optBaidu);
        $('#selMap').append(optGaode);
        $('#selMap').append(optSOSO);
    } else if (language == "en-us") {

    }
    var optOSM = '<option value="OSM">' + 'OpenStreetMap' + '</option>';
    $('#selMap').append(optOSM);
    var defaultMap = $("#hidSelMap").val();
    $("#selMap option[value='" + defaultMap + "']").attr("selected", "selected");
}

function changeMap() {
    var m = $('#selMap').val();
    var n = $("#hidLoginName").val();
    n = encodeURIComponent(n);
    location.href = "http://192.168.1.35:84/application/index/iframemap?id=" + UserId + "&n=" + n + "&m=" + m;
}

window.onresize = syncSize;

function syncSize() {
    var h = $(this).height() - 8 - 15;
    $("#map_canvas").css("height", h + "px");
}

function forTimeMethod() {
    $("#spanSecond").html(forTimer / 1000);
    forTimeSecond = setInterval(second, 1000);
}

function checkShowDeviceName(v) {
    if (isShowDeviceName != v) {
        if (v) {
            ShowDeviceName();
        } else {
            HideDeviceName();
        }
        isShowDeviceName = v;
    }
}

var secondIndex = 1;
function second() {

    var s = forTimer / 1000 - secondIndex;
    $("#spanSecond").html(s);
    secondIndex++;
    if (s == 1) {

        parent.ajaxGetDevices();
        secondIndex = 0;
    }

}

function clearSecond() {
    secondIndex = 1;
    if (forTimeSecond) {
        clearInterval(forTimeSecond);
        clearAllMap();
        isFortime = false;
    }
}

function GetInfoWContx(data) {
    return GetPopupHtml(data);
}

function GetPopupHtml(data) {
    var html = [];
    var imghtml = "<img style='float:right' onclick='HideDeviceInfo(" + data.id + ")' border='0' src='images/iw_close.gif'/>";
    html.push("<b>" + data.name + "</b>" + imghtml + "<br />");
    html.push("<b>" + allPage.imeiNo + ":</b>" + data.sn + "<br />");
    var status = getDeviceStatus(data.status);
    html.push("<b>" + allPage.state + ":</b>" + status + "<br />");
    if (data.model == 12 || data.model == 18 || data.model == 25 || data.model == 80 || data.model == 81 || data.model == 15 || data.model == 17 || data.model == 26 || data.model == 43 || data.model == 45 || data.model == 46 || data.model == 47 || data.model == 40 || data.model == 44|| data.model == 27 || data.model == 28 || data.model == 29|| data.model == 30) {
        //GT06
        var accStr = GetAccStr(data.dataContext);
        html.push("<b>" + allPage.accStr + ":</b>" + accStr + "<br />");
    }
    html.push("<b>" + allPage.positionTime + ":</b>" + data.serverUtcDate + "<br />");
    var timeStr = minuteToStr(data.stopTimeMinute);
    if (data.isStop == 1) {
        html.push("<b>" + allPage.stopTime + ":</b>" + timeStr + "<br />");
    } else {
        var courseName = GetCoureName(data.course);
        html.push("<b>" + allPage.drection + ":</b>" + courseName + "<br />");
        html.push("<b>" + allPage.speed + ":</b>" + data.speed + allPage.speedKM + "<br />");
    }
    var gpslbs = data.dataType == "2" ? "LBS" : "GPS";
    html.push("<b>" + allPage.positionType + ":</b>" + gpslbs + "<br />");
    html.push('<span>');
    html.push('<a href="javascript:void(0);" onclick="openPage(\'Tracking.aspx\',' + UserId + ',' + data.id + ')" >' + allPage.tracking + '</a>&nbsp;');
    html.push('<a href="javascript:void(0);"  onclick="openPage(\'Playback.aspx\',' + UserId + ',' + data.id + ')">' + allPage.playback + '</a>&nbsp;');

    //GT08 OBD诊断
    //    if (data.model == 26) {
    //        var loginName = $("#hidLoginName").val(); //OBD
    //        html.push('<a href="OBD/index.aspx?id=' + UserId + '&n=' + loginName + '&deviceid=' + data.id + '" target="_blank">' + allPage.obd + '</a> ');
    //    } else {
    //非GT08设备显示电子栅栏, GT08电子栅栏移动到下拉菜单
    html.push('<a href="javascript:void(0);"  onclick="openPage(\'Geofences.aspx\',' + UserId + ',' + data.id + ')">' + geofencesPage.geofence + '</a>&nbsp;');
    //  }

    //html.push('<a href="javascript:void(0);"  onclick="openPage(\'Geofences.aspx\',' + UserId + ',' + data.id + ')">' + geofencesPage.geofence + '</a>&nbsp;');
    html.push('<a href="javascript:void(0);"  onclick="clkShowMoreMenu(' + data.id + ',' + data.model + ',\'' + data.name + '\',\'' + data.sn + '\');">' + allPage.more + '▼</a>');
    html.push('</span>');
    html.push("<br />&nbsp;&nbsp;");
    return html.join('');
}

function openPage(url, userid, deviceid) {
    var p = IDEncryption(deviceid);
    var openUrl = url + "?id=" + userid + '&deviceid=' + deviceid + "&p=" + p;
    window.open(openUrl);
}

var intervalDeviceMore = null;
function clkShowMoreMenu(deviceid, model, name, sn) {
    if (intervalDeviceMore) clearInterval(intervalDeviceMore);
    var html = [];
    html.push('<div style="margin-top:5px;">');

    html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a style="text-decoration:none;" href="javascript:void(0);" onclick="parent.showDivIframe(\'ProductUpdate.aspx\',' + deviceid + ');">' + mapPage.divicesInfo + '</a></div>');

    if (status != 1) {
        //GT06,AW02,GT07,GT06,GT06N 断油电,恢复油电,checklocation
        if (model == 12 || model == 18 || model == 80 || model == 81 || model == 15 || model == 17 || model == 26) {
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:parent.showPassword(' + deviceid + ',\'DYD\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:parent.showPassword(' + deviceid + ',\'HFYD\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:parent.showPassword(' + deviceid + ',\'CheckLocation\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.checkLocation + '</a></div>');
        } else if (model == 25) {
            //GT06C
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:parent.showPassword(' + deviceid + ',\'C001ON\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:parent.showPassword(' + deviceid + ',\'C001OFF\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:parent.showPassword(' + deviceid + ',\'Q001\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.checkLocation + '</a></div>');
        } else if (model == 50 || model == 83) {
            //宏远
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:parent.showPassword(' + deviceid + ',\'AV010\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:parent.showPassword(' + deviceid + ',\'AV011\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
        } else if (model == 40 || model == 43 || model == 44 || model == 45 || model == 46 || model == 47) {
            //明达
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:parent.showPassword(' + deviceid + ',\'MDDYD\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:parent.showPassword(' + deviceid + ',\'MDHFYD\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
        }

        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a style="text-decoration:none;" href="javascript:parent.showCommandList(' + deviceid + ',\'' + sn + '\',1);" >' + mapPage.checkCommand + '</a></div>');
        if (status != 2) {
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a style="text-decoration:none;" href="javascript:void(0);" onclick="parent.showDivIframe(\'DownloadLocation.aspx\',' + deviceid + ');">' + mapPage.downloadLocation + '</a></div>');
        }
    }

    html.push('<div style="height:6px;"></div>');
    html.push("</div>");
    $("#divLeftMenuContext").html(html.join(''));
    var menuHeight = $("#divLeftMenu").height();
    var top = $(this).height() - mousetop;
    var marginTop = 5;
    if (top > menuHeight) {
        marginTop = 5;
    } else {
        marginTop = menuHeight;
    }
    $("#divLeftMenu").css({ "top": mousetop - marginTop, "left": mouseleft - 10 }).show();
    $(".showdivs").mouseover(function () {
        $(".showitems").eq($(".showdivs").index(this)).show();
    }).mouseleave(function () {
        $(".showitems").eq($(".showdivs").index(this)).hide();
    });
}

function hideMoreItems() {//隐藏更多功能选项

    if (intervalDeviceMore) clearInterval(intervalDeviceMore);
    intervalDeviceMore = setInterval(function () {
        document.getElementById("divLeftMenu").style.display = "none";
        clearInterval(intervalDeviceMore);
    }, 1000)

}

function getDeviceStatus(s) {
    var status = "";
    if (s == "LoggedOff") {
        status = allPage.status1;
    } else if (s == "Move") {
        status = allPage.moving;
    } else if (s == "Stop") {
        status = allPage.stopCar;

    } else if (s == "Offline") {
        status = allPage.offline;
    } else if (s == "Arrears") {
        status = allPage.arrears;
    }
    return status;
}


//显示POI
var poiJson = null;
function showPOIMap(uid) {
    poiJson = null;
    var m = $('#selMap').val();
    if (m == "Baidu" || m == "Google") {
        $.ajax({
            type: "post",
            url: "Ajax/GeofenceAjax.asmx/GetPOI",
            contentType: "application/json",
            data: "{UserID:" + uid + ",TimeZone:'" + timeZone + "'}",
            dataType: "json",
            error: function (res) {
                //alert(res.responseText);
            },
            success: function (result) {
                if (result.d != "" && result.d != "{}") {
                    var json = eval("(" + result.d + ")");
                    poiJson = json;
                    showPOIInMap();
                }
            }
        });
    }
}


//分钟转换到天小时分钟格式
function minuteToStr(minute) {

    var time = "";

    var day = parseInt(minute / 60 / 24);
    var hour = parseInt((minute / 60) - (day * 24));
    var minu = (minute) - (day * 24 * 60) - (hour * 60);
    if (day > 0) {
        time = day + allPage.day;
        time += hour + allPage.hour;
        time += minu + allPage.minute;
    } else if (hour > 0) {
        time = hour + allPage.hour;
        time += minu + allPage.minute;
    } else {
        time = minu + allPage.minute;
    }

    return time;

}


function GetAddress(id) {
    GetAddressByMap(id);
}

//判断长度,一个中文为2
function fucCheckLength(strTemp) {
    var i, sum;
    sum = 0;
    for (i = 0; i < strTemp.length; i++) {
        if ((strTemp.charCodeAt(i) >= 0) && (strTemp.charCodeAt(i) <= 255))
            sum = sum + 1;
        else
            sum = sum + 2;
    }
    return sum;
}  