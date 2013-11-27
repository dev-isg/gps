//别的地图JS中方法,必须要包含的有
//initmap,clearMap,addMarker,ShowOrHideDeviceInfo,clearAllMap,HideDeviceName
//其余地图JS方法名和功能,和这里面一致.
var bounds = new google.maps.LatLngBounds();
var is1 = false;
function initmap() {
    initGoogleMap(0, 0, 0);
}


var MrkArr = new Array(); //设备弹出框信息数组



//显示POI
function showPOIInMap(poiJson) {
    for (var i = 0; i < poiJson.poiArr.length; i++) {

        var point = new google.maps.LatLng(poiJson.poiArr[i].latitude, poiJson.poiArr[i].longitude);
        var icon = "icons/startstr.png";
        var sIcon = icon; //  new BMap.Icon(icon, new BMap.Size(20, 34));
        marker = new google.maps.Marker({
            position: point,
            map: map,
            title: poiJson.poiArr[i].name,
            icon: icon
        });
        // BMap.Marker(point, { icon: sIcon });
        //        map.addOverlay(marker);
        //        var label = new BMap.Label(poiJson.poiArr[i].name, { offset: new BMap.Size(-3, 22) });
        //        marker.setLabel(label);
        new NameOverlay(point, poiJson.poiArr[i].name, map);

    }
}


//清除地图
function clearMap() {
    $(MrkArr).each(function (ind, value) {
        MapRemoveOneMrk(ind);
    });
    //清除Deviceid
    MrkArr.DeviceId = undefined;
    bounds = new google.maps.LatLngBounds();
}

//清除单个
function MapRemoveOneMrk(DeviceID) {
    var mrk = MrkArr[DeviceID];
    if (mrk == undefined) {
        return;
    }
    //清除设备标识
    if (mrk.Curmrk != undefined) {
        mrk.Curmrk.setMap(null);
    }
    //清除设备名
    if (mrk.PopupMarDeviceName != undefined) {
        mrk.PopupMarDeviceName.setMap(null);
        mrk.PopupMarDeviceName = undefined;
    }
    MrkArr[DeviceID] = undefined;

}

//添加地标
function addMarker(data) {
    //alert(data.id);
    if (data.latitude == "") {
        return;
    }
    //设置数据
    if (MrkArr[data.id] == undefined) {
        MrkArr[data.id] = new Object();
    }
    MrkArr[data.id].data = data;
    var ct = new google.maps.LatLng(data.latitude, data.longitude);
    //最后一次中心位置 
    var icon = GetIcon(data.icon, data.status, data.course);
    if (MrkArr[data.id].Curmrk != undefined) {
        MrkArr[data.id].Curmrk.setPosition(ct);
        MrkArr[data.id].Curmrk.setIcon(icon);
    } else {
        MrkArr[data.id].Curmrk = new google.maps.Marker({
            position: ct,
            map: map,
            title: data.name,
            icon: icon
        });
        //显示信息框
        google.maps.event.addListener(MrkArr[data.id].Curmrk, 'click', function (event) {
            ShowDeviceInfo(data.id);
            GetAddress(data.id);
        });
    }
    if (showPopupmarkerID != data.id) {
        //显示设备名
        if (isShowDeviceName) {
            if (MrkArr[data.id].PopupMarDeviceName == undefined) {
                ShowDeviceNameOnc(data.id);
            }
        } else {
        }
        if (MrkArr[data.id].PopupMarDeviceName != undefined) {
            var obj = { "position": ct };
            MrkArr[data.id].PopupMarDeviceName.update(obj);
        }
    } else {
        if (showPopupmarker) {
            var html = GetInfoWContx(MrkArr[data.id].data);
            var obj = { "position": ct, "text": html };
            showPopupmarker.update(obj);
        } else {
            /*
            //切换在线,离线使用
            ShowDeviceInfoContext(showPopupmarkerID);
            //隐藏设备名
            HideDeviceNameOne(showPopupmarkerID);*/
        }
    }
    bounds.extend(ct);
}

//这句最重要.. 自动适应
function fitBounds() {
    if (is1) {
        is1 = false
        map.fitBounds(bounds);
    }
}

//显示设备信息
function ShowDeviceInfo(DeviceID, fun) {

    if (MrkArr[DeviceID] == undefined) {
        return;
    }
    if (showPopupmarker) {
        if (showPopupmarkerID != DeviceID) {
            showPopupmarker.setMap(null);
            ShowDeviceNameOnc(showPopupmarkerID);
        }
    }
    if (!showPopupmarker || showPopupmarkerID != DeviceID) {
        ShowDeviceInfoContext(DeviceID);
        //隐藏设备名
        HideDeviceNameOne(DeviceID);
        showPopupmarkerID = DeviceID;
    }
}

//隐藏设备弹出框
function HideDeviceInfo(DeviceID) {
    if (showPopupmarker) {
        showPopupmarker.setMap(null);
    }
    if (isShowDeviceName) {
        //显示设备名
        ShowDeviceNameOnc(DeviceID);
    }
    showPopupmarkerID = 0;
    showPopupmarker = null;
}

//切换用户时,使用,隐藏弹出框
function HidePopumarker() {
    if (showPopupmarker) {
        showPopupmarker.setMap(null);
    }
    showPopupmarkerID = 0;
    showPopupmarker = null;
}
//切换在线,离线时使用
function HideShowPopumarker() {
    if (showPopupmarker) {
        showPopupmarker.setMap(null);
    }
    showPopupmarker = null;
}

function ShowDeviceInfoContext(DeviceID) {
    var ct = new google.maps.LatLng(MrkArr[DeviceID].data.latitude, MrkArr[DeviceID].data.longitude);
    showPopupmarker = new PopupMarker({
        position: ct,
        map: map,
        icon: "images/1px.png",
        text: GetInfoWContx(MrkArr[DeviceID].data),
        showpop: true,
        id: DeviceID
    });
    map.panTo(ct);
}

function HideDeviceInfoContext(DeviceID) {
    if (showPopupmarker) {
        showPopupmarker.setMap(null);
        showPopupmarker = null;
    }
    showPopupmarkerID = 0;
}


//显示设备名
function ShowDeviceName() {
    $(MrkArr).each(function (ind) {
        if (MrkArr[ind] != undefined) {
            ShowDeviceNameOnc(ind);
        }
    });
}
//显示单个设备名
function ShowDeviceNameOnc(ind) {
    if (MrkArr[ind].PopupMarDeviceName != undefined) {
        HideDeviceNameOne(ind);
    }
    MrkArr[ind].PopupMarDeviceName = new PopupMarker({
        position: new google.maps.LatLng(MrkArr[ind].data.latitude, MrkArr[ind].data.longitude),
        map: map,
        icon: "images/1px.png",
        text: MrkArr[ind].data.name,
        showpop: true,
        id: ind
    });
}

//隐藏设备名
function HideDeviceName() {
    $(MrkArr).each(function (ind) {
        HideDeviceNameOne(ind);
    });
}
//隐藏单个设备名
function HideDeviceNameOne(ind) {
    if (MrkArr[ind] != undefined && MrkArr[ind].PopupMarDeviceName != undefined) {
        MrkArr[ind].PopupMarDeviceName.setMap(null);
    }
}

function setMapCenter(DeviceID) {
    var ct = new google.maps.LatLng(MrkArr[DeviceID].data.latitude, MrkArr[DeviceID].data.longitude);
    if (map) {
        map.panTo(ct);
        map.setZoom(16);
    }
}


function clearAllMap() {

    clearMap();
    MrkArr.length = 0;
}

function GetAddressByMap(id) {
    //如果语言为中文,则用谷米
    //为英文,用google
    if (language == "zh-cn") {
        GetAddressByGoome2(id);
    } else {
        GetAddressByGoogle(id);
    }
}
//谷米接口解析
function GetAddressByGoome2(id) {
    $('#divMarkerAddress').html("");
    //获取地址,保持统一,都用百度经纬度
    var lat = 0;
    var lng = 0;
    for (var i = 0; i < parent.allDevices.devices.length; i++) {
        var d = parent.allDevices.devices[i];
        if (d.id == id) {
            lat = d.baiduLat;
            lng = d.baiduLng;
            break;
        }
    }
    GetAddressByGoome(lat, lng);
}

var geocoder = new google.maps.Geocoder();
//获取地址信息
function GetAddressByGoogle(id) {
    if (!geocoder) {
        geocoder = new google.maps.Geocoder();
    }
    var lat = 0;
    var lng = 0;
    for (var i = 0; i < parent.allDevices.devices.length; i++) {
        var d = parent.allDevices.devices[i];
        if (d.id == id) {
            lat = d.latitude;
            lng = d.longitude
            break;
        }
    }
    if (lat != 0) {
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    $("#divMarkerAddress").html(results[1].formatted_address);
                } else {

                }
            } else {

            }
        });
    }
}








