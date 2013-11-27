var oLat = 22.502;
var oLng = 113.932;
var oZoom = 4;

function initGoogleMap(lat, lng, zoom) {
    try {
        //初始化地图
        if (lat == "" || lat == 0) {
            lat = oLat;
            lng = oLng;
        }
        if (zoom == 0) {
            zoom = oZoom;
        }
        var latlng = new google.maps.LatLng(lat, lng);
        var myOptions = {
            zoom: oZoom,
            center: latlng,
            navigationControl: true,
            scaleControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        map.minZoom = 2;
        /* 实时交通,路况信息
        var trafficLayer = new google.maps.TrafficLayer();  
        trafficLayer.setMap(map); 
        */
    } catch (e) {
        //initGoogleMap(lat, lng, zoom);

    }
}


function showPOIMap(uid) {
    var poiJson = null;
    //    var m = $('#selMap').val();
    //    if (m == "Baidu" || m == "Google") {
    var timeZone = $('#hidTimeZone').val();
    $.ajax({
        type: "post",
        url: "http://localhost/car/json/dataGoogle.json",
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
                showPOIInMap(poiJson);
            }
        }
    });
    // }
}





NameOverlay.prototype = new google.maps.OverlayView(); // 扩展OverlayView

// NameOverlay定义
function NameOverlay(point, name, map) {

    // 初始化参数：坐标、文字、地图
    this.point_ = point;
    this.name_ = name;
    this.map_ = map;

    // 到onAdd时才需要创建div
    this.div_ = null;

    // 加入map
    this.setMap(map);
}

NameOverlay.prototype.onAdd = function () {

    // 创建一个div，其中包含了当前文字
    var div = document.createElement('DIV');
    div.style.border = "solid 1px red"; //Style
    div.style.borderWidth = "1px";
    div.style.background = "#FFF";
    // div.style.left = "-50px";
    div.style.position = "absolute";

    var span = document.createElement("span");
    var text = document.createTextNode(this.name_);
    span.appendChild(text);
    div.appendChild(span);

    // Set the overlay's div_ property to this DIV
    this.div_ = div;

    // We add an overlay to a map via one of the map's panes.
    // We'll add this overlay to the overlayImage pane.
    var panes = this.getPanes();
    panes.overlayImage.appendChild(div);
}

NameOverlay.prototype.draw = function () {

    // 利用projection获得当前视图的坐标
    var overlayProjection = this.getProjection();

    var center = overlayProjection.fromLatLngToDivPixel(this.point_);

    // 为简单，长宽是固定的，实际应该根据文字改变
    var div = this.div_;
    div.style.left = (center.x -30 ) + 'px';//div.style.width/2
    div.style.top = center.y + 'px';
     div.style.width = '60px';
    div.style.textAlign = "center";
    //div.style.height = '10px';
}

NameOverlay.prototype.onRemove = function () {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
}


