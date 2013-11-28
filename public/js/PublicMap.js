//判断是否需要画线
function isGPSPolyline(lastData, nowData, type) {
    //如果2个点之间的距离大于1500米,则不连线,Google判断大点
    var distance = 0;
    var maxDistance = 1800;
    if (type == "Baidu") {
        distance = GetDistance(lastData.baiduLat, lastData.baiduLng, nowData.baiduLat, nowData.baiduLng);
    } else if (type == "Google") {
        distance = GetDistance(lastData.latitude, lastData.longitude, nowData.latitude, nowData.longitude);
        maxDistance = 2000;
    } else {
        distance = GetDistance(lastData.oLat, lastData.oLng, nowData.oLat, nowData.oLng);
    }
    if (distance > maxDistance) {
        return false;
    } else {
        return true;
    }
}

function Rad(d) {
    return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
}
//计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
function GetDistance(lat1, lng1, lat2, lng2) {

    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
         Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000 * 1000; //输出米
    return s;
} 

function GetCoureName(course) {
    var name = "";
    course = parseFloat(course);
    if ((course >= 0 && course < 22.5) || (course >= 337.5 && course < 360)) // 0
    {
        name = courseName.dueNorth; //北
    }
    else if (course >= 22.5 && course < 67.5) // 45
    {
        name = courseName.northeast;  //东北
    }
    else if (course >= 67.5 && course < 112.5) // 90
    {
        name = courseName.dueEast; //正东
    }
    else if (course >= 112.5 && course < 157.5) //135
    {
        name = courseName.southeast; //东南
    }
    else if (course >= 157.5 && course < 202.5) //180
    {
        name = courseName.dueSouth; //正南
    }
    else if (course >= 202.5 && course < 247.5) //225
    {
        name = courseName.southwest; //西南
    }
    else if (course >= 247.5 && course < 292.5) //270
    {
        name = courseName.dueWest; //正西
    }
    else if (course >= 292.5 && course < 337.5) //315
    {
        name = courseName.northwest; //西北
    }
    else {
        name = "";
    }
    return name;
}


//获取ACC状态
function GetAccStr(dataContext) {
    var dataStr = dataContext;
    var accStr = allPage.acc2;
    if (dataStr != "") {
        var accInt = dataStr.substring(0, 1);
        accStr = parseInt(accInt) == 0 ? allPage.acc0 : allPage.acc1;
    }
    return accStr;
}


//只用于百度地图
function GetBaiduIcon(t, s, c) {
    if (s == "Arrears") {
        s = "Offline";
    }
    var bIcon = new BMap.Icon("../../icons/green", new BMap.Size(12, 20));
    var course = parseFloat(c);
    var icon = "";
    if ((course >= 0 && course < 22.5) || (course >= 337.5 && course < 360) || course >= 360) // 0,360
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_0.png";
            } else {
                icon = "../../icons/carIcon/27_0.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_0.png";
            } else {
                icon = "../../icons/carIcon/21_0.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_0.png";
            } else {
                icon = "../../icons/carIcon/22_0.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_0.png";
            } else {
                icon = "../../icons/carIcon/23_0.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_0.png";
            } else {
                icon = "../../icons/carIcon/24_0.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_0.png";
            } else {
                icon = "../../icons/carIcon/25_0.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_0.png";
            } else {
                icon = "../../icons/carIcon/26_0.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        }
    }
    else if (course >= 22.5 && course < 67.5) // 45
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_45.png";
            } else {
                icon = "../../icons/carIcon/27_45.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_45.png";
            } else {
                icon = "../../icons/carIcon/21_45.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_45.png";
            } else {
                icon = "../../icons/carIcon/22_45.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_45.png";
            } else {
                icon = "../../icons/carIcon/23_45.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_45.png";
            } else {
                icon = "../../icons/carIcon/24_45.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_45.png";
            } else {
                icon = "../../icons/carIcon/25_45.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_45.png";
            } else {
                icon = "../../icons/carIcon/26_45.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        }
    }
    else if (course >= 67.5 && course < 112.5) // 90
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_90.png";
            } else {
                icon = "../../icons/carIcon/27_90.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_90.png";
            } else {
                icon = "../../icons/carIcon/21_90.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_90.png";
            } else {
                icon = "../../icons/carIcon/22_90.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_90.png";
            } else {
                icon = "../../icons/carIcon/23_90.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_90.png";
            } else {
                icon = "../../icons/carIcon/24_90.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_90.png";
            } else {
                icon = "../../icons/carIcon/25_90.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_90.png";
            } else {
                icon = "../../icons/carIcon/26_90.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        }
    }
    else if (course >= 112.5 && course < 157.5) //135
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_135.png";
            } else {
                icon = "../../icons/carIcon/27_135.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_135.png";
            } else {
                icon = "../../icons/carIcon/21_135.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_135.png";
            } else {
                icon = "../../icons/carIcon/22_135.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_135.png";
            } else {
                icon = "../../icons/carIcon/23_135.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_135.png";
            } else {
                icon = "../../icons/carIcon/24_135.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_135.png";
            } else {
                icon = "../../icons/carIcon/25_135.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_135.png";
            } else {
                icon = "../../icons/carIcon/26_135.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        }
    }
    else if (course >= 157.5 && course < 202.5) //180
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_180.png";
            } else {
                icon = "../../icons/carIcon/27_180.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_180.png";
            } else {
                icon = "../../icons/carIcon/21_180.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_180.png";
            } else {
                icon = "../../icons/carIcon/22_180.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_180.png";
            } else {
                icon = "../../icons/carIcon/23_180.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_180.png";
            } else {
                icon = "../../icons/carIcon/24_180.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_180.png";
            } else {
                icon = "../../icons/carIcon/25_180.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_180.png";
            } else {
                icon = "../../icons/carIcon/26_180.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        }
    }
    else if (course >= 202.5 && course < 247.5) //225
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_225.png";
            } else {
                icon = "../../icons/carIcon/27_225.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_225.png";
            } else {
                icon = "../../icons/carIcon/21_225.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_225.png";
            } else {
                icon = "../../icons/carIcon/22_225.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_225.png";
            } else {
                icon = "../../icons/carIcon/23_225.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_225.png";
            } else {
                icon = "../../icons/carIcon/24_225.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_225.png";
            } else {
                icon = "../../icons/carIcon/25_225.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_225.png";
            } else {
                icon = "../../icons/carIcon/26_225.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        }
    }
    else if (course >= 247.5 && course < 292.5) //270
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_270.png";
            } else {
                icon = "../../icons/carIcon/27_270.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_270.png";
            } else {
                icon = "../../icons/carIcon/21_270.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_270.png";
            } else {
                icon = "../../icons/carIcon/22_270.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_270.png";
            } else {
                icon = "../../icons/carIcon/23_270.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_270.png";
            } else {
                icon = "../../icons/carIcon/24_270.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_270.png";
            } else {
                icon = "../../icons/carIcon/25_270.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_270.png";
            } else {
                icon = "../../icons/carIcon/26_270.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        }
    }
    else if (course >= 292.5 && course < 337.5) //315
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_315.png";
            } else {
                icon = "../../icons/carIcon/27_315.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_315.png";
            } else {
                icon = "../../icons/carIcon/21_315.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_315.png";
            } else {
                icon = "../../icons/carIcon/22_315.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_315.png";
            } else {
                icon = "../../icons/carIcon/23_315.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_315.png";
            } else {
                icon = "../../icons/carIcon/24_315.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_315.png";
            } else {
                icon = "../../icons/carIcon/25_315.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_315.png";
            } else {
                icon = "../../icons/carIcon/26_315.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        }
    }
    else {
        
    }

    return bIcon;
}


function GetIcon(t, s, c) {
    if (s == "Arrears") {
        s = "Offline";
    }
    var course = parseFloat(c);
    //alert(course);
    var icon = "../../icons/carIcon/27.gif";
    if ((course >= 0 && course < 22.5) || (course >= 337.5 && course < 360) || course >= 360) // 0,360
    {
        //alert(t);
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_0.png";
            } else {
                icon = "../../icons/carIcon/27_0.png";
            }
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_0.png";
            } else {
                icon = "../../icons/carIcon/21_0.png";
            }
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_0.png";
            } else {
                icon = "../../icons/carIcon/22_0.png";
            }
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_0.png";
            } else {
                icon = "../../icons/carIcon/23_0.png";
            }
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_0.png";
            } else {
                icon = "../../icons/carIcon/24_0.png";
            }
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_0.png";
            } else {
                icon = "../../icons/carIcon/25_0.png";
            }
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_0.png";
            } else {
                icon = "../../icons/carIcon/26_0.png";
            }
        }
    }
    else if (course >= 22.5 && course < 67.5) // 45
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_45.png";
            } else {
                icon = "../../icons/carIcon/27_45.png";
            }
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_45.png";
            } else {
                icon = "../../icons/carIcon/21_45.png";
            }
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_45.png";
            } else {
                icon = "../../icons/carIcon/22_45.png";
            }
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_45.png";
            } else {
                icon = "../../icons/carIcon/23_45.png";
            }
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_45.png";
            } else {
                icon = "../../icons/carIcon/24_45.png";
            }
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_45.png";
            } else {
                icon = "../../icons/carIcon/25_45.png";
            }
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_45.png";
            } else {
                icon = "../../icons/carIcon/26_45.png";
            }
        }
    }
    else if (course >= 67.5 && course < 112.5) // 90
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_90.png";
            } else {
                icon = "../../icons/carIcon/27_90.png";
            }
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_90.png";
            } else {
                icon = "../../icons/carIcon/21_90.png";
            }
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_90.png";
            } else {
                icon = "../../icons/carIcon/22_90.png";
            }
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_90.png";
            } else {
                icon = "../../icons/carIcon/23_90.png";
            }
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_90.png";
            } else {
                icon = "../../icons/carIcon/24_90.png";
            }
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_90.png";
            } else {
                icon = "../../icons/carIcon/25_90.png";
            }
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_90.png";
            } else {
                icon = "../../icons/carIcon/26_90.png";
            }
        }
    }
    else if (course >= 112.5 && course < 157.5) //135
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_135.png";
            } else {
                icon = "../../icons/carIcon/27_135.png";
            }
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_135.png";
            } else {
                icon = "../../icons/carIcon/21_135.png";
            }
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_135.png";
            } else {
                icon = "../../icons/carIcon/22_135.png";
            }
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_135.png";
            } else {
                icon = "../../icons/carIcon/23_135.png";
            }
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_135.png";
            } else {
                icon = "../../icons/carIcon/24_135.png";
            }
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_135.png";
            } else {
                icon = "../../icons/carIcon/25_135.png";
            }
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_135.png";
            } else {
                icon = "../../icons/carIcon/26_135.png";
            }
        }
    }
    else if (course >= 157.5 && course < 202.5) //180
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_180.png";
            } else {
                icon = "../../icons/carIcon/27_180.png";
            }
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_180.png";
            } else {
                icon = "../../icons/carIcon/21_180.png";
            }
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_180.png";
            } else {
                icon = "../../icons/carIcon/22_180.png";
            }
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_180.png";
            } else {
                icon = "../../icons/carIcon/23_180.png";
            }
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_180.png";
            } else {
                icon = "../../icons/carIcon/24_180.png";
            }
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_180.png";
            } else {
                icon = "../../icons/carIcon/25_180.png";
            }
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_180.png";
            } else {
                icon = "../../icons/carIcon/26_180.png";
            }
        }
    }
    else if (course >= 202.5 && course < 247.5) //225
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_225.png";
            } else {
                icon = "../../icons/carIcon/27_225.png";
            }
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_225.png";
            } else {
                icon = "../../icons/carIcon/21_225.png";
            }
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_225.png";
            } else {
                icon = "../../icons/carIcon/22_225.png";
            }
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_225.png";
            } else {
                icon = "../../icons/carIcon/23_225.png";
            }
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_225.png";
            } else {
                icon = "../../icons/carIcon/24_225.png";
            }
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_225.png";
            } else {
                icon = "../../icons/carIcon/25_225.png";
            }
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_225.png";
            } else {
                icon = "../../icons/carIcon/26_225.png";
            }
        }
    }
    else if (course >= 247.5 && course < 292.5) //270
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_270.png";
            } else {
                icon = "../../icons/carIcon/27_270.png";
            }
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_270.png";
            } else {
                icon = "../../icons/carIcon/21_270.png";
            }
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_270.png";
            } else {
                icon = "../../icons/carIcon/22_270.png";
            }
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_270.png";
            } else {
                icon = "../../icons/carIcon/23_270.png";
            }
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_270.png";
            } else {
                icon = "../../icons/carIcon/24_270.png";
            }
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_270.png";
            } else {
                icon = "../../icons/carIcon/25_270.png";
            }
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_270.png";
            } else {
                icon = "../../icons/carIcon/26_270.png";
            }
        }
    }
    else if (course >= 292.5 && course < 337.5) //315
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_315.png";
            } else {
                icon = "../../icons/carIcon/27_315.png";
            }
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_315.png";
            } else {
                icon = "../../icons/carIcon/21_315.png";
            }
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_315.png";
            } else {
                icon = "../../icons/carIcon/22_315.png";
            }
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_315.png";
            } else {
                icon = "../../icons/carIcon/23_315.png";
            }
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_315.png";
            } else {
                icon = "../../icons/carIcon/24_315.png";
            }
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_315.png";
            } else {
                icon = "../../icons/carIcon/25_315.png";
            }
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_315.png";
            } else {
                icon = "../../icons/carIcon/26_315.png";
            }
        }
    }
    else {

    }

    return icon;
}




//[0]:图片地址,[1]:宽,[2]:高
function GetIconArr(t, s, c) {
    if (s == "Arrears") {
        s = "Offline";
    }
    var course = parseFloat(c);
    var arr = [];
    var icon = "";
    var iconWidth = 0;
    var iconHeight = 0;
    if ((course >= 0 && course < 22.5) || (course >= 337.5 && course < 360) || course >= 360) // 0,360
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_0.png";
            } else {
                icon = "../../icons/carIcon/27_0.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            iconWidth = 14, iconHeight = 18;
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_0.png";
            } else {
                icon = "../../icons/carIcon/21_0.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_0.png";
            } else {
                icon = "../../icons/carIcon/22_0.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_0.png";
            } else {
                icon = "../../icons/carIcon/23_0.png";
            }
            iconWidth = 24, iconHeight = 24;
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_0.png";
            } else {
                icon = "../../icons/carIcon/24_0.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_0.png";
            } else {
                icon = "../../icons/carIcon/25_0.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_0.png";
            } else {
                icon = "../../icons/carIcon/26_0.png";
            }
            iconWidth = 28, iconHeight = 28;
        }
    }
    else if (course >= 22.5 && course < 67.5) // 45
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_45.png";
            } else {
                icon = "../../icons/carIcon/27_45.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            iconWidth = 14, iconHeight = 18;
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_45.png";
            } else {
                icon = "../../icons/carIcon/21_45.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_45.png";
            } else {
                icon = "../../icons/carIcon/22_45.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_45.png";
            } else {
                icon = "../../icons/carIcon/23_45.png";
            }
            iconWidth = 24, iconHeight = 24;
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_45.png";
            } else {
                icon = "../../icons/carIcon/24_45.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_45.png";
            } else {
                icon = "../../icons/carIcon/25_45.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_45.png";
            } else {
                icon = "../../icons/carIcon/26_45.png";
            }
            iconWidth = 28, iconHeight = 28;
        }
    }
    else if (course >= 67.5 && course < 112.5) // 90
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_90.png";
            } else {
                icon = "../../icons/carIcon/27_90.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            iconWidth = 14, iconHeight = 18;
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_90.png";
            } else {
                icon = "../../icons/carIcon/21_90.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_90.png";
            } else {
                icon = "../../icons/carIcon/22_90.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_90.png";
            } else {
                icon = "../../icons/carIcon/23_90.png";
            }
            iconWidth = 24, iconHeight = 24;
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_90.png";
            } else {
                icon = "../../icons/carIcon/24_90.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_90.png";
            } else {
                icon = "../../icons/carIcon/25_90.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_90.png";
            } else {
                icon = "../../icons/carIcon/26_90.png";
            }
            iconWidth = 28, iconHeight = 28;
        }
    }
    else if (course >= 112.5 && course < 157.5) //135
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_135.png";
            } else {
                icon = "../../icons/carIcon/27_135.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            iconWidth = 14, iconHeight = 18;
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_135.png";
            } else {
                icon = "../../icons/carIcon/21_135.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_135.png";
            } else {
                icon = "../../icons/carIcon/22_135.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_135.png";
            } else {
                icon = "../../icons/carIcon/23_135.png";
            }
            iconWidth = 24, iconHeight = 24;
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_135.png";
            } else {
                icon = "../../icons/carIcon/24_135.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_135.png";
            } else {
                icon = "../../icons/carIcon/25_135.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_135.png";
            } else {
                icon = "../../icons/carIcon/26_135.png";
            }
            iconWidth = 28, iconHeight = 28;
        }
    }
    else if (course >= 157.5 && course < 202.5) //180
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_180.png";
            } else {
                icon = "../../icons/carIcon/27_180.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            iconWidth = 14, iconHeight = 18;
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_180.png";
            } else {
                icon = "../../icons/carIcon/21_180.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_180.png";
            } else {
                icon = "../../icons/carIcon/22_180.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_180.png";
            } else {
                icon = "../../icons/carIcon/23_180.png";
            }
            iconWidth = 24, iconHeight = 24;
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_180.png";
            } else {
                icon = "../../icons/carIcon/24_180.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_180.png";
            } else {
                icon = "../../icons/carIcon/25_180.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_180.png";
            } else {
                icon = "../../icons/carIcon/26_180.png";
            }
            iconWidth = 28, iconHeight = 28;
        }
    }
    else if (course >= 202.5 && course < 247.5) //225
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_225.png";
            } else {
                icon = "../../icons/carIcon/27_225.png";
            }
            biconWidth = 28, iconHeight = 28;
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            iconWidth = 14, iconHeight = 18;
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_225.png";
            } else {
                icon = "../../icons/carIcon/21_225.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_225.png";
            } else {
                icon = "../../icons/carIcon/22_225.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_225.png";
            } else {
                icon = "../../icons/carIcon/23_225.png";
            }
            iconWidth = 24, iconHeight = 24;
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_225.png";
            } else {
                icon = "../../icons/carIcon/24_225.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_225.png";
            } else {
                icon = "../../icons/carIcon/25_225.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_225.png";
            } else {
                icon = "../../icons/carIcon/26_225.png";
            }
            iconWidth = 28, iconHeight = 28;
        }
    }
    else if (course >= 247.5 && course < 292.5) //270
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_270.png";
            } else {
                icon = "../../icons/carIcon/27_270.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            iconWidth = 14, iconHeight = 18;
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_270.png";
            } else {
                icon = "../../icons/carIcon/21_270.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_270.png";
            } else {
                icon = "../../icons/carIcon/22_270.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_270.png";
            } else {
                icon = "../../icons/carIcon/23_270.png";
            }
            iconWidth = 24, iconHeight = 24;
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_270.png";
            } else {
                icon = "../../icons/carIcon/24_270.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_270.png";
            } else {
                icon = "../../icons/carIcon/25_270.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_270.png";
            } else {
                icon = "../../icons/carIcon/26_270.png";
            }
            iconWidth = 28, iconHeight = 28;
        }
    }
    else if (course >= 292.5 && course < 337.5) //315
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_315.png";
            } else {
                icon = "../../icons/carIcon/27_315.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            iconWidth = 14, iconHeight = 18;
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_315.png";
            } else {
                icon = "../../icons/carIcon/21_315.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_315.png";
            } else {
                icon = "../../icons/carIcon/22_315.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_315.png";
            } else {
                icon = "../../icons/carIcon/23_315.png";
            }
            iconWidth = 24, iconHeight = 24;
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_315.png";
            } else {
                icon = "../../icons/carIcon/24_315.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_315.png";
            } else {
                icon = "../../icons/carIcon/25_315.png";
            }
            iconWidth = 28, iconHeight = 28;
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_315.png";
            } else {
                icon = "../../icons/carIcon/26_315.png";
            }
            iconWidth = 28, iconHeight = 28;
        }
    }
    else {

    }
    arr.push(icon);
    arr.push(iconWidth);
    arr.push(iconHeight);
    return arr;
}



//只用于搜搜地图
function GetSOSOIcon(t, s, c) {
    if (s == "Arrears") {
        s = "Offline";
    }
    var sIcon = null;
    var course = parseFloat(c);
    var icon = "";
    var offsetPoint = new soso.maps.Point(28, 28), iconSize = new soso.maps.Size(28, 28);
    if ((course >= 0 && course < 22.5) || (course >= 337.5 && course < 360) || course >= 360) // 0,360
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_0.png";
            } else {
                icon = "../../icons/carIcon/27_0.png";
            }

        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            offsetPoint = new soso.maps.Point(14, 18), iconSize = new soso.maps.Size(14, 18);

        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_0.png";
            } else {
                icon = "../../icons/carIcon/21_0.png";
            }
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_0.png";
            } else {
                icon = "../../icons/carIcon/22_0.png";
            }
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_0.png";
            } else {
                icon = "../../icons/carIcon/23_0.png";
            }
            offsetPoint = new soso.maps.Point(24, 24), iconSize = new soso.maps.Size(24, 24);
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_0.png";
            } else {
                icon = "../../icons/carIcon/24_0.png";
            }
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_0.png";
            } else {
                icon = "../../icons/carIcon/25_0.png";
            }
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_0.png";
            } else {
                icon = "../../icons/carIcon/26_0.png";
            }
        }
    }
    else if (course >= 22.5 && course < 67.5) // 45
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_45.png";
            } else {
                icon = "../../icons/carIcon/27_45.png";
            }
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            offsetPoint = new soso.maps.Point(14, 18), iconSize = new soso.maps.Size(14, 18);
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_45.png";
            } else {
                icon = "../../icons/carIcon/21_45.png";
            }
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_45.png";
            } else {
                icon = "../../icons/carIcon/22_45.png";
            }
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_45.png";
            } else {
                icon = "../../icons/carIcon/23_45.png";
            }
            offsetPoint = new soso.maps.Point(24, 24), iconSize = new soso.maps.Size(24, 24);
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_45.png";
            } else {
                icon = "../../icons/carIcon/24_45.png";
            }
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_45.png";
            } else {
                icon = "../../icons/carIcon/25_45.png";
            }
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_45.png";
            } else {
                icon = "../../icons/carIcon/26_45.png";
            }
        }
    }
    else if (course >= 67.5 && course < 112.5) // 90
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_90.png";
            } else {
                icon = "../../icons/carIcon/27_90.png";
            }
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            offsetPoint = new soso.maps.Point(14, 18), iconSize = new soso.maps.Size(14, 18);
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_90.png";
            } else {
                icon = "../../icons/carIcon/21_90.png";
            }
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_90.png";
            } else {
                icon = "../../icons/carIcon/22_90.png";
            }
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_90.png";
            } else {
                icon = "../../icons/carIcon/23_90.png";
            }
            offsetPoint = new soso.maps.Point(24, 24), iconSize = new soso.maps.Size(24, 24);
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_90.png";
            } else {
                icon = "../../icons/carIcon/24_90.png";
            }
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_90.png";
            } else {
                icon = "../../icons/carIcon/25_90.png";
            }
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_90.png";
            } else {
                icon = "../../icons/carIcon/26_90.png";
            }
        }
    }
    else if (course >= 112.5 && course < 157.5) //135
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_135.png";
            } else {
                icon = "../../icons/carIcon/27_135.png";
            }
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            offsetPoint = new soso.maps.Point(14, 18), iconSize = new soso.maps.Size(14, 18);
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_135.png";
            } else {
                icon = "../../icons/carIcon/21_135.png";
            }
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_135.png";
            } else {
                icon = "../../icons/carIcon/22_135.png";
            }
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_135.png";
            } else {
                icon = "../../icons/carIcon/23_135.png";
            }
            offsetPoint = new soso.maps.Point(24, 24), iconSize = new soso.maps.Size(24, 24);
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_135.png";
            } else {
                icon = "../../icons/carIcon/24_135.png";
            }
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_135.png";
            } else {
                icon = "../../icons/carIcon/25_135.png";
            }
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_135.png";
            } else {
                icon = "../../icons/carIcon/26_135.png";
            }
        }
    }
    else if (course >= 157.5 && course < 202.5) //180
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_180.png";
            } else {
                icon = "../../icons/carIcon/27_180.png";
            }
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            offsetPoint = new soso.maps.Point(14, 18), iconSize = new soso.maps.Size(14, 18);
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_180.png";
            } else {
                icon = "../../icons/carIcon/21_180.png";
            }
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_180.png";
            } else {
                icon = "../../icons/carIcon/22_180.png";
            }
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_180.png";
            } else {
                icon = "../../icons/carIcon/23_180.png";
            }
            offsetPoint = new soso.maps.Point(24, 24), iconSize = new soso.maps.Size(24, 24);
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_180.png";
            } else {
                icon = "../../icons/carIcon/24_180.png";
            }
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_180.png";
            } else {
                icon = "../../icons/carIcon/25_180.png";
            }
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_180.png";
            } else {
                icon = "../../icons/carIcon/26_180.png";
            }
        }
    }
    else if (course >= 202.5 && course < 247.5) //225
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_225.png";
            } else {
                icon = "../../icons/carIcon/27_225.png";
            }
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            offsetPoint = new soso.maps.Point(14, 18), iconSize = new soso.maps.Size(14, 18);
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_225.png";
            } else {
                icon = "../../icons/carIcon/21_225.png";
            }
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_225.png";
            } else {
                icon = "../../icons/carIcon/22_225.png";
            }
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_225.png";
            } else {
                icon = "../../icons/carIcon/23_225.png";
            }
            offsetPoint = new soso.maps.Point(24, 24), iconSize = new soso.maps.Size(24, 24);
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_225.png";
            } else {
                icon = "../../icons/carIcon/24_225.png";
            }
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_225.png";
            } else {
                icon = "../../icons/carIcon/25_225.png";
            }
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_225.png";
            } else {
                icon = "../../icons/carIcon/26_225.png";
            }
        }
    }
    else if (course >= 247.5 && course < 292.5) //270
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_270.png";
            } else {
                icon = "../../icons/carIcon/27_270.png";
            }
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            offsetPoint = new soso.maps.Point(14, 18), iconSize = new soso.maps.Size(14, 18);
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_270.png";
            } else {
                icon = "../../icons/carIcon/21_270.png";
            }
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_270.png";
            } else {
                icon = "../../icons/carIcon/22_270.png";
            }
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_270.png";
            } else {
                icon = "../../icons/carIcon/23_270.png";
            }
            offsetPoint = new soso.maps.Point(24, 24), iconSize = new soso.maps.Size(24, 24);
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_270.png";
            } else {
                icon = "../../icons/carIcon/24_270.png";
            }
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_270.png";
            } else {
                icon = "../../icons/carIcon/25_270.png";
            }
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_270.png";
            } else {
                icon = "../../icons/carIcon/26_270.png";
            }
        }
    }
    else if (course >= 292.5 && course < 337.5) //315
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_315.png";
            } else {
                icon = "../../icons/carIcon/27_315.png";
            }
        } else if (t == 2) {
            icon = "../../icons/carIcon/2.png";
            offsetPoint = new soso.maps.Point(14, 18), iconSize = new soso.maps.Size(14, 18);
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_27_315.png";
            } else {
                icon = "../../icons/carIcon/21_315.png";
            }
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_22_315.png";
            } else {
                icon = "../../icons/carIcon/22_315.png";
            }
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_23_315.png";
            } else {
                icon = "../../icons/carIcon/23_315.png";
            }
            offsetPoint = new soso.maps.Point(24, 24), iconSize = new soso.maps.Size(24, 24);
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_24_315.png";
            } else {
                icon = "../../icons/carIcon/24_315.png";
            }
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_25_315.png";
            } else {
                icon = "../../icons/carIcon/25_315.png";
            }
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "../../icons/carIcon/offline_26_315.png";
            } else {
                icon = "../../icons/carIcon/26_315.png";
            }
        }
    }
    else {

    }
    sIcon = new soso.maps.MarkerImage(icon, iconSize, offsetPoint);
    return sIcon;
}