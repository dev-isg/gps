var pageCount = 10;
var isShowDeviceList = false;
var UserId = 0;  //当前点击的用户ID,非登陆用户ID
var language = "zh-cn";
var status = 0;
var allUsers = [];
var zTreeMain = "";
$(document).ready(function () {
     
    setInitLanguage();
    syncSize();
    status = parseInt($("#hidStatus").val());
    $("#spanUserName").html($("#hidUserName").val());
    UserId = $("#hidUserID").val();
    language = $("#hidLanguage").val();
    $("#divDevicesList").easydrag();
    $("#divDevicesList").setHandler("divDevicesListHead");
    $("#divIframe").easydrag();
    $("#divIframe").setHandler("divIframeTitle");
    if (isShowDeviceList) {
        showDevicesListDiv(1);
    }
    init();
    $("#divLeftMenu").bind("mouseleave", hideMoreItems);
    //$("#divLeftMenuGroup").bind("mouseleave", hideGroupItems);
    var src = $("#hidIframeSrc").val();
    $("#ifmMap").attr("src", src);
    ajaxLoadingTree();

    $(".icon-gp").click(function(){
        if($(this).html()=='∧'){
            $(this).html('∨');
            $('#divDevicesTable').height(
                ($('#divDevicesTable').height()-130)+'px');
                $('#divLeftSearchUsers').hide();
        }else{
            $(this).html('∧');
            $('#divDevicesTable').height(
                ($('#divDevicesTable').height()+130)+'px')
        }
        $('#userTreeDiv').toggle();
    });
    $("#SearchText").focus(function(){
        if(this.value==''||this.value==homePage.quickSearch){
            this.value='';
        }
        searchUsers('f');
    });
    $("#SearchText").blur(function(){
        if(this.value==''){
            this.value=homePage.quickSearch;
        }
    });
    $("#SearchText").keyup(function(){
        showSearchUsers(this.value);
    });
    $(".ico-des").click(function(){
        searchUsers2();
    });

    $("#txtSearchInput").focus(function(){
        searchInput('f');
    });
    $("#txtSearchInput").keyup(function(){
        showSearchDevices(this.value);
    });
    $("#imgProductSearch").click(function(){
        searchInput2();
    });
});

window.onresize = syncSize;

function syncSize() {
    var h = $(this).height() - 8;
    var w = $(this).width() - 30;
    $("#divLeft").css("height", h + "px");
    $("#ifmMap").css("height", h + "px");
    var mapWidth = w - 235;
    $("#ifmMap").css("width", mapWidth + "px");
    var w2 = $(this).width();
    $("#divInputPass").css("marginLeft", (w2 - 310) / 2 + "px");
    $("#divSOSPhone").css("marginLeft", (w2 - 310) / 2 + "px");
    $("#divInterval").css("marginLeft", (w2 - 310) / 2 + "px");
    $("#divCellPhone").css("marginLeft", (w2 - 310) / 2 + "px");
    $("#divSendTxt").css("marginLeft", (w2 - 310) / 2 + "px");
    $("#divSendCmd").css("marginLeft", (w2 - 310) / 2 + "px");
    $("#divCommandList").css("marginLeft", (w2 - 800) / 2 + "px");
    var h2 = $(this).height() - 65 - 170 - 20;
    $("#divDevicesTable").css("height", h2 + "px");

    var h3 = $(this).height() - 30;
    $("#divDevicesList").css("top", h3 + "px");
}

function showDevicesListDiv(t) {
    if (t == 0) {
        $("#divDevicesListInfo").css("display", "none");
        $("#divDevicesList").css("height", "25px");
        var h = $(this).height() - 30;
        $("#divDevicesList").animate({ left: 0 + "px", top: h + "px", width: 260 + "px" }, 300);
    } else {
        $("#divDevicesListInfo").css("display", "block");
        $("#divDevicesList").css("height", "250px");
        var h = $(this).height() - 150;
        var w = $(this).width() - 850;
        $("#divDevicesList").animate({ left: (w / 2) + "px", top: (h) + "px", width: 850 + "px" }, 300);


    }
}


function showSearchUsers(n) {
    if (allUsers) {
        likeSearchUsers(n, allUsers);
    }
}

function searchUsers(t) {
    var input = $("#SearchText").val();
    if (t == "f") {
        if (input == mapPage.searchInput) {
            $("#SearchText").val('');
            input = "";
        }
        showSearchUsers(input);
        $("#divLeftSearchUsers").show();
    } else {
        if (input == '') {
            $("#SearchText").val(mapPage.searchInput);
        }
        $("#divLeftSearchUsers").hide();
    }
}
//模糊搜索,设备名,车牌号
function likeSearchUsers(searchStr, arr) {
    var html = [];
    html.push('<table width="100%" border="0">');
    for (var i = 0; i < arr.length; i++) {
        var isShow = false;
        var deviceName = arr[i].name;
        if (searchStr != "") {
            if (deviceName.indexOf(searchStr) != -1) {
                isShow = true;
            }
        } else {
            isShow = true;
        }
        if (isShow) {
            html.push('<tr style="cursor:pointer;" onclick="searchUsersClk(' + arr[i].id + ',\'' + deviceName + '\')"><td>' + deviceName + '</td></tr>');
        }
    }
    html.push('</table>');
    $("#divLeftSearchUsers").html(html.join(''));
}

function searchUsersClk(id, name) {

    $("#divLeftMenu").hide();
    $("#divLeftSearchUsers").hide();
    $("#SearchText").val(name)

    var parentZNode = zTreeMain.getNodeByParam("id", id);
    zTreeMain.selectNode(parentZNode); 
    initUserDevices();
    openDeviceDivID = null;
    UserId = id; //  treeNode.id;
    ifmMap.window.clearSecond();
    ifmMap.window.HidePopumarker(); 
    getGroup(); 

}
function searchUsers2() {
    var display = document.getElementById("divLeftSearchUsers");
    if (display.style.display == "block" || display.style.display == "") {
        $("#divLeftSearchUsers").hide();
    } else {
        var sTxt = $("#SearchText").val();
        if (sTxt == mapPage.searchInput) {
            sTxt = "";
        }
        //showSearchDevices(sTxt);
        $("#divLeftSearchUsers").show();
    }
}
function setInitLanguage() {
    $("#txtSearchInput").val(mapPage.searchInput);
    $("#sendBtn").val(" " + allPage.confirm + " ");
    $("#btnAddGroup").val(allPage.confirm);
    $("#closeBtn").val(" " + allPage.cancel + " ");
    $("#lbldivCommandListTitle").html(mapPage.checkCommandTitle);

    $("#btnSendSOSPhone").val(" " + allPage.confirm + " ");
    $("#btnCloseSOSPhone").val(" " + allPage.cancel + " ");
    $("#SearchText").val(homePage.quickSearch);
    $("#btnCellPhone").val(" " + allPage.confirm + " ");
    $("#btnCloseCellPhone").val(" " + allPage.cancel + " ");

    $("#btnInterval").val(" " + allPage.confirm + " ");
    $("#btnCloseInterval").val(" " + allPage.cancel + " ");

    $("#btnSendTxt").val(" " + allPage.confirm + " ");
    $("#btnCloseSendTxt").val(" " + allPage.cancel + " ");

    $("#btnSendCmd").val(" " + allPage.confirm + " ");
    $("#btnCloseSendCmd").val(" " + allPage.cancel + " ");
}


function ajaxLoadingTree() {
    var uid = $("#hidUserID").val();
    
    var setting = {
        data: {
            simpleData: {
                enable: true
            }
        },
        async: {
            enable: true,
            url: "http://192.168.1.35:84/json/empresa.json",
            autoParam: ["id"],
            otherParam: { "staticID": uid }
        },
        callback: {
            onClick: onClick,
            onAsyncSuccess: onAsyncSuccess1
        }

    };

    zTreeMain = $.fn.zTree.init($("#uiTreeView"), setting);
}

function onAsyncSuccess1(event, treeId, treeNode, msg) {
    $("#divLoading").hide();
    var json = eval("(" + msg + ")");

    getAllChildrenNodes(json);
}
function getAllChildrenNodes(treeNode) {
    var users = {};

    if (treeNode.length == undefined) {
        users.name = treeNode.name;

        users.id = treeNode.id;
        allUsers.push(users);
        var childrenNodes = treeNode.children;
        if (childrenNodes) {
            for (var i = 0; i < childrenNodes.length; i++) {
                getAllChildrenNodes(childrenNodes[i]);
            }
        }
    } else {
        for (var i = 0; i < treeNode.length; i++) {
            users = {};
            users.name = treeNode[i].name;
            users.id = treeNode[i].id;
            allUsers.push(users);

        }

    } 
}

var isFirst = true;
var allDevices = null;
var allGroups = [];
var allGroupsDivIDs = [];

function onClick(event, treeId, treeNode, clickFlag) {

    $("#divLeftMenu").hide();
    initUserDevices();
    openDeviceDivID = null;
    UserId = treeNode.id;
    ifmMap.window.is1 = true;
    ifmMap.window.clearSecond();
    ifmMap.window.HidePopumarker();
    getGroup();

}


function showDeviceList(a) {
    //alert('hi mundo');
    var s = $("#" + a).parent().attr("des");
    for (var i = 0; i < 3; i++) {
        var id = "aAll";
        if (i == 0) {
            id = "aAll";
        } else if (i == 1) {
            id = "aOnline";
        } else if (i == 2) {
            id = "aOffline";
        }

        var s2 = $("#" + id).parent().attr("des");
        if (s2 == s) {
            $("#" + id).parent().attr("id", "navigate_item_over");
        } else {
            $("#" + id).parent().attr("id", "navigate_item");
        }
    }
    $("#divLeftMenu").hide();
    changeDevicesList(a);

}

var clkTabDeviceTab = "all";
function changeDevicesList(s) {

    //aAll
    //aOnline
    //aOffline
    var type = "all";
    if (s == "aAll") {

    } else if (s == "aOnline") {
        type = "online";
    } else {
        type = "offline";
    }
    ifmMap.window.HideShowPopumarker();
    showDevicesTable(type);
    clkTabDeviceTab = type;
}



function initUserDevices() {
    allDevices = null;
    allGroups.length = 0;
    allGroupsDivIDs.length = 0;
    $("#divDevicesTable").html("");
    $("#divLeftMenuGroup").html("");
}

function initGetDevices() {
    isFirst = true;
    ajaxGetDevices();
    //获取POI
    ifmMap.window.showPOIMap(UserId);
}

function ajaxGetDevices() {
   
    var TimeZone = $("#hidTimeZone").val();
    $.ajax({
        type: "post",
        url: "http://192.168.1.35:84/application/index/getvehiculos",
        contentType: "application/json",
        data: "{UserID:" + UserId + ",isFirst:" + isFirst + ",TimeZones:'" + TimeZone + "'}",
        dataType: "json",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            //alert(result.d + "  " );
            if (result.d != "") {
                //alert(result.d);
                var json = eval("(" + result.d + ")");
                if (allDevices) {
                    for (var i = 0; i < json.devices.length; i++) {
                        var isCz = false;
                        for (var j = 0; j < allDevices.devices.length; j++) {
                            if (json.devices[i].id == allDevices.devices[j].id) {
                                //allDevices.devices[j].locationID = json.devices[i].locationID;
                                allDevices.devices[j].groupID = json.devices[i].groupID;
                                allDevices.devices[j].serverUtcDate = json.devices[i].serverUtcDate;
                                allDevices.devices[j].deviceUtcDate = json.devices[i].deviceUtcDate;
                                //allDevices.devices[j].stopTimeMinute = json.devices[i].stopTimeMinute;
                                allDevices.devices[j].latitude = json.devices[i].latitude;
                                allDevices.devices[j].longitude = json.devices[i].longitude;
                                allDevices.devices[j].baiduLat = json.devices[i].baiduLat;
                                allDevices.devices[j].baiduLng = json.devices[i].baiduLng;
                                allDevices.devices[j].oLat = json.devices[i].oLat;
                                allDevices.devices[j].oLng = json.devices[i].oLng;
                                allDevices.devices[j].speed = json.devices[i].speed;
                                allDevices.devices[j].course = json.devices[i].course;
                                allDevices.devices[j].dataType = json.devices[i].dataType;
                                allDevices.devices[j].dataContext = json.devices[i].dataContext;
                                //allDevices.devices[j].SOSTime = json.devices[i].SOSTime;
                                //allDevices.devices[j].exceptionTime = json.devices[i].exceptionTime;
                                allDevices.devices[j].distance = json.devices[i].distance;
                                allDevices.devices[j].isStop = json.devices[i].isStop;
                                allDevices.devices[j].status = json.devices[i].status;
                                isCz = true;
                                break;
                            }
                        }

                    }
                } else {
                    allDevices = json;
                }
                isFirst = false;

                showDevicesTable(clkTabDeviceTab);
                //设备下拉列表
                showSearchDevices("");
            }
        }
    });
}

var showMoreDivDeviceArr = [];
var openDeviceDivID = null;
var lastChangeTabState = null;
function showDevicesTable(s) {
    //alert('hi mundo');
    if (!ifmMap.window.isFortime) {
        ifmMap.window.forTimeMethod();
        ifmMap.window.isFortime = true;
    }
    if (lastChangeTabState) {
        //alert(s);
        if (lastChangeTabState != s) {
            ifmMap.window.clearMap();
        }
    }
    var deviceListScrollTop = document.getElementById("divDevicesTable").scrollTop;
    var deviceDevicesListInfoScrollTop = document.getElementById("divDevicesListInfo").scrollTop;
    lastChangeTabState = s;
    clearGroupDivTxt();
    //$("#divDevicesListInfo").html("");
    var online = 0;
    var devicesListHtml = [];

    devicesListHtml.push('<table width="100%" border="0" cellspacing="0" cellpadding="2" class="tab">');
    devicesListHtml.push('<thead>');
    devicesListHtml.push('<tr height="25" style="background:#F5F5F5;">');
    devicesListHtml.push('<th>' + allPage.deviceName + '</th>');
    devicesListHtml.push('<th>' + allPage.imeiNo + '</th>');
    devicesListHtml.push('<th>' + allPage.modelName + '</th>');
    devicesListHtml.push('<th>' + allPage.carNum + '</th>');
    devicesListHtml.push('<th>' + allPage.speedLimit + '</th>');
    devicesListHtml.push('<th>' + allPage.lat + '</th>');
    devicesListHtml.push('<th>' + allPage.lng + '</th>');
    devicesListHtml.push('<th>' + allPage.speed + '</th>');
    devicesListHtml.push('<th>' + allPage.drection + '</th>');
    devicesListHtml.push('<th>' + allPage.allDistance + "(" + allPage.km + ')</th>');
    devicesListHtml.push('<th>' + allPage.state + '</th>');
    devicesListHtml.push('<th>' + allPage.positionTime + '</th>');
    devicesListHtml.push('</tr></thead>');
   
    showMoreDivDeviceArr = [];
    var loginUserID = $("#hidUserID").val();
    var isExistPopumarker = false;
    for (var i = 0; i < allDevices.devices.length; i++) {
        var html = [];
        var status = "";
        var color = "#B7B7B7";
        var speed = "";
        var isShow = false;
        var isShowMore = true;
        if (s == "all") {
            isShow = true;
        }
        if (allDevices.devices[i].status == "LoggedOff") {
            status = allPage.status1;
            if (s == "offline") {
                isShow = true;
            }
            isShowMore = false;
        } else if (allDevices.devices[i].status == "Move") {
            status = allPage.moving;
            color = "#00CC33";
            speed = allDevices.devices[i].speed + '&nbsp;&nbsp;';
            if (s == "online") {
                isShow = true;
            }
        } else if (allDevices.devices[i].status == "Stop") {
            status = allPage.stopCar;
            color = "#00CC33";
            if (s == "online") {
                isShow = true;
            }

        } else if (allDevices.devices[i].status == "Offline") {
            status = allPage.offline;
            if (s == "offline") {
                isShow = true;
            }
        } else if (allDevices.devices[i].status == "Arrears") {
            status = allPage.arrears;
            if (s == "offline") {
                isShow = true;
            }
        }

        var iconImg = 'u_online.gif';
        if (allDevices.devices[i].status == "LoggedOff" || allDevices.devices[i].status == "Offline" || allDevices.devices[i].status == "Arrears") {
            iconImg = 'u_offline.gif';
        } else {
            online++;
        }
        if (allDevices.devices[i] == null || allDevices.devices[i] == undefined) {
            isShow = false;
        }
        if (isShow) {
            if (ifmMap.window.showPopupmarkerID == allDevices.devices[i].id) {
                isExistPopumarker = true;
            }
           
            if (allDevices.devices[i].status != "LoggedOff") {
               
                ifmMap.window.addMarker(allDevices.devices[i]);
            }
            var idTab = "divTabDevice" + allDevices.devices[i].id;
            var display = "none";
            var divClass = "";
            if (allDevices.devices[i].id == openDeviceDivID) {
                display = "block";
                divClass = "divDeviceTab";
                //color = "#000000";
            }

            html.push('<div id="' + idTab + '" class="' + divClass + '" style="clear:left;width:243px; margin-left:10px; cursor:pointer;  color:' + color + ';line-height:135%;" ');
            if (isShowMore) {
                html.push('onclick="showMoreDivDevice(\'' + allDevices.devices[i].id + '\',\'' + status + '\')">');
                devicesListHtml.push('<tr onclick="showMoreDivDevice(\'' + allDevices.devices[i].id + '\',\'' + status + '\')" style="cursor:pointer;">');
            } else {
                html.push('>');
                devicesListHtml.push('<tr>');
            }
            html.push('<img src="../../icons/' + iconImg + '" width="16" height="16" style="float:left;" />');

            var deviceName = allDevices.devices[i].name;

            var nameLength = fucCheckLength(allDevices.devices[i].name);
            if (nameLength > 8) {
                var endShowName = "";
                var nameSize = getHtmlSize(deviceName);
                if (nameSize.width > 105) {
                    for (var sindex = 0; sindex < deviceName.length; sindex++) {
                        var names = deviceName.substring(0, sindex + 1);
                        var nameSize2 = getHtmlSize(names);
                        if (nameSize2.width > 100) {
                            endShowName = names;
                            break;
                        }
                    }
                    deviceName = endShowName + "...";
                }
            }

            html.push('<div style="width:120px; height:20px; float:left;">' + deviceName + '</div>');
            html.push('<div style="float:left;">' + speed + status + '</div>');
            var id = "divTabDeviceMore" + allDevices.devices[i].id;
            showMoreDivDeviceArr.push(allDevices.devices[i].id);
            if (isShowMore) {
                html.push('<div id="' + id + '" style="clear:left;color:' + color + '; margin-left:80px; display:' + display + ';">' + '<a href="javascript:void(0);" onclick="openPage(\'Tracking.aspx\',' + loginUserID + ',' + allDevices.devices[i].id + ')" >' + allPage.tracking + '</a>  <a href="javascript:void(0);"  onclick="openPage(\'Playback.aspx\',' + loginUserID + ',' + allDevices.devices[i].id + ')">' + allPage.playback + '</a>  <a href="javascript:void(0);" onclick="clkShowMoreMenu(\'' + loginUserID + '\',\'' + allDevices.devices[i].id + '\',' + allDevices.devices[i].model + ',\'' + allDevices.devices[i].name + '\',\'' + allDevices.devices[i].sn + '\');">' + allPage.more + '▼</a>' + '</div>');
            }
            html.push('</div>');

            var groupDivID = "divGroup-0";
            var spanGroupID = "spanGroup-0";
            if (allDevices.devices[i].groupID > 0) {
                groupDivID = "divGroup-" + allDevices.devices[i].groupID;
                spanGroupID = "spanGroup-" + allDevices.devices[i].groupID;
            }
            $("#" + groupDivID).append(html.join(''));
            //数量

            var count = parseInt($("#" + spanGroupID).html());
            count++;
            $("#" + spanGroupID).html(count);

            devicesListHtml.push('<td class="tc">&nbsp;' + allDevices.devices[i].name + '</td>');
            devicesListHtml.push('<td class="tc">' + allDevices.devices[i].sn + '</td>');
            devicesListHtml.push('<td class="tc">' + allDevices.devices[i].modelName + '</td>');
            devicesListHtml.push('<td class="tc">&nbsp;' + allDevices.devices[i].carNum + '</td>');
            devicesListHtml.push('<td class="tc">' + allDevices.devices[i].speedLimit + '</td>');
            var oLat = allDevices.devices[i].latitude;
            var oLng = allDevices.devices[i].longitude;
            if (oLat == "" || oLat == undefined) {
                oLat = allDevices.devices[i].oLat;
                oLng = allDevices.devices[i].oLng;
            }
            if (oLat == "" || oLat == undefined) {
                oLat = allDevices.devices[i].baiduLat;
                oLng = allDevices.devices[i].baiduLng;
            }
            devicesListHtml.push('<td class="tc">' + oLat + '</td>');
            devicesListHtml.push('<td class="tc">' + oLng + '</td>');
            devicesListHtml.push('<td class="tc">' + allDevices.devices[i].speed + '</td>');
            var courseName = GetCoureName(allDevices.devices[i].course);
            devicesListHtml.push('<td class="tc">' + courseName + '</td>');
            devicesListHtml.push('<td class="tc">' + allDevices.devices[i].distance + '</td>');
            var statusStr = "";
            if (allDevices.devices[i].model == 12 || allDevices.devices[i].model == 18 || allDevices.devices[i].model == 25 || allDevices.devices[i].model == 80 || allDevices.devices[i].model == 81 || allDevices.devices[i].model == 15 || allDevices.devices[i].model == 17 || allDevices.devices[i].model == 26) {
                //GT06,GT06C,AW02
                var accStr = GetAccStr(allDevices.devices[i].dataContext);
                statusStr = allPage.accStr + ":" + accStr;
            }
            devicesListHtml.push('<td class="tc">&nbsp;' + statusStr + '</td>');
            devicesListHtml.push('<td class="tc">' + allDevices.devices[i].deviceUtcDate + '</td');
            devicesListHtml.push('</tr>');
        }
    }
    ifmMap.window.fitBounds();
    //切换时,显示分组
    if (ifmMap.window.showPopupmarkerID > 0) {
        ifmMap.window.ShowDeviceInfo(ifmMap.window.showPopupmarkerID);
    }
    document.getElementById("divDevicesTable").scrollTop = deviceListScrollTop;
    //$("#divDevicesTable").html(html.join(''));
    devicesListHtml.push('</table>');
    $("#divDevicesListInfo").html(devicesListHtml.join(''));
    document.getElementById("divDevicesListInfo").scrollTop = deviceDevicesListInfoScrollTop;
    $("#spanDevicesAll").html(allDevices.devices.length);
    $("#spanDevicesOnline").html(online);
    $("#spanDevicesOffline").html((allDevices.devices.length - online));
}

function getHtmlSize(html) {
    var size = {};
    var span = document.getElementById("spanMapPopupContentSize");
    span.innerHTML = html;
    span.style.display = '';
    size.width = span.offsetWidth;
    size.height = span.offsetHeight;
    span.style.display = 'none';
    var ret, lines = html.split(/\n/i), totalSize = eval("(" + "{width:1,height: 1}" + ")");

    for (var i = 0; i < lines.length; i++) {
        totalSize.width += size.width;
        totalSize.height += size.height;
    }
    return totalSize;
};



function showMoreDivDevice(id, s) {
    if (openDeviceDivID != id) {
        $("#divLeftMenu").hide();

        var lastidMore = "divTabDeviceMore" + openDeviceDivID;
        var lastidTab = "divTabDevice" + openDeviceDivID;
        $("#" + lastidMore).hide();
        $("#" + lastidTab).removeClass("divDeviceTab");
        ifmMap.window.setMapCenter(id);

        var idMore = "divTabDeviceMore" + id;
        var idTab = "divTabDevice" + id;
        $("#" + idMore).show();
        $("#" + idTab).addClass("divDeviceTab");
        ifmMap.window.ShowDeviceInfo(id); //显示信息框
        ifmMap.window.GetAddress(id);
    } else {

    }
    openDeviceDivID = id;
}


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



var intervalDeviceMore = null;
var clkGroupItemDeviceID = 0; //用于设备分组
function clkShowMoreMenu(userid, deviceid, model, name, sn) {
    if (intervalDeviceMore) clearInterval(intervalDeviceMore);
    clkGroupItemDeviceID = deviceid;
    var html = [];
    html.push('<div style="margin-top:5px;">');

    html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);" onclick="showDivIframe(\'ProductUpdate.aspx\',' + deviceid + ');">' + mapPage.divicesInfo + '</a></div>');
    if (status != 1) {
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="Geofences.aspx?id=' + userid + '&deviceid=' + deviceid + '" target="_blank">' + mapPage.geofence + '</a></div>');
    }
    html.push('<div style="padding-top:2px;" class="showdivs" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);">' + mapPage.moveToGroup + '</a>');
    html.push('<div id="divLeftMenuGroup" class="showitems"></div>');
    html.push('</div>');
    if (status != 1) {
        //GT06,AW02,GT07,GT06N 断油电,恢复油电,checklocation
        if (model == 12 || model == 18 || model == 80 || model == 81 || model == 15 || model == 17 || model == 26) {
            //下发指令
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showSendCmd(' + deviceid + ',\'DIYSEND\',\'' + name + '\',\'' + sn + '\',' + model + ');" >' + allPage.sendMsg + '</a></div>');

            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'DYD\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'HFYD\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'CheckLocation\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.checkLocation + '</a></div>');
        }
    else if (model == 27 || model == 28 || model == 29 || model == 30) {
            //GT100=27 GT200=28 ET100=29 GT88=30 
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showSendCmd(' + deviceid + ',\'DIYSEND\',\'' + name + '\',\'' + sn + '\',' + model + ');" >' + allPage.sendMsg + '</a></div>');

            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'RELAY1\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'RELAY0\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'GT88CheckLocation\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.checkLocation + '</a></div>');
   
        } else if (model == 25) {
            //GT06C
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'C001ON\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'C001OFF\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'Q001\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.checkLocation + '</a></div>');
        } else if (model == 50 || model == 83) {
            //宏远
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'AV010\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'AV011\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
        } else if (model == 60 || model == 61) {
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showSOSPassword(' + deviceid + ',\'BP11\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "SOS号码" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showCellPhone(' + deviceid + ',\'BP05\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "亲情号码" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showDeviceInterval(' + deviceid + ',\'BP07\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "上传间隔" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showSendTxt(' + deviceid + ',\'BP13\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "下发文字" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP020\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "远程设防" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP021\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "远程撤防" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP030\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "远程断油" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP040\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "远程恢复油" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP120\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "监听开启" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP121\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "监听关闭" + '</a></div>');
        } else if (model == 40 || model == 43 || model == 44 || model == 45 || model == 46 || model == 47) {
            //明达
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'MDDYD\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'MDHFYD\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
        } else if (model == 90) {
            //部标
            var loginUserID = $("#hidUserID").val();
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'PHOTO\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "设备拍照" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'Lock\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "车门加锁" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'Unlock\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "车门解锁" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);" onclick="openPage(\'DeviceImgs.aspx\',' + loginUserID + ',' + deviceid + ')" >' + "查看照片" + '</a></div>');
        }
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showCommandList(' + deviceid + ',\'' + sn + '\',1);" >' + mapPage.checkCommand + '</a></div>');
        if (status != 2) {
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);" onclick="showDivIframe(\'DownloadLocation.aspx\',' + deviceid + ');">' + mapPage.downloadLocation + '</a></div>');
            if (language == "zh-cn") {
                html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="RoutePlanning.aspx?id=' + UserId + '" target="_blank">路线偏离设置</a></div>');
                html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="POI.aspx?id=' + UserId + '" target="_blank">用户POI管理</a></div>');
            }else if(language == "en-us")
       {
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="POI.aspx?id=' + UserId + '" target="_blank">Add POI</a></div>');
       }
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
        marginTop = menuHeight - 10;
    }
    $("#divLeftMenu").css({ "top": mousetop - marginTop, "left": mouseleft - 10 }).show();
    showGroupMenuItems();
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

var intervalGroupItem = null;
function hideGroupItems() {//隐藏设备分组

    if (intervalGroupItem) clearInterval(intervalGroupItem);
    intervalGroupItem = setInterval(function () {
        document.getElementById("divLeftMenuGroup").style.display = "none";
        clearInterval(intervalGroupItem);
    }, 1000)

}

var commandType = null; //命令类型
var commandDeviceID = 0; //选中下发命令设备
var commandDeviceSN = null; //选中下发命令的设备IMEI号
var commandModel = 0;
var commandPort = 0; //明达设备下发端口
function showPassword(id, t, name, sn, model) {
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    if (t == "MDDYD" || t == "MDHFYD") {
        $("#trPort").show();
    } else {
        $("#trPort").hide();
    }

    if (t == "DYD" || t == "C001ON" || t == "MDDYD") {
        $("#lblInputPassTitle").html(mapPage.cutOffPetrol);
    } else if (t == "HFYD" || t == "C001OFF" || t == "MDHFYD") {
        $("#lblInputPassTitle").html(mapPage.restorePetrol);
    } else if (t == "BP020") {
        $("#lblInputPassTitle").html("远程设防");
    } else if (t == "BP021") {
        $("#lblInputPassTitle").html("远程撤防");
    } else if (t == "BP030") {
        $("#lblInputPassTitle").html("远程断油");
    } else if (t == "BP040") {
        $("#lblInputPassTitle").html("远程恢复油");
    } else if (t == "BP120") {
        $("#lblInputPassTitle").html("远程开启监听");
    } else if (t == "BP121") {
        $("#lblInputPassTitle").html("远程关闭监听");
    } else if (t == "Lock") {
        $("#lblInputPassTitle").html("车门加锁");
    } else if (t == "Unlock") {
        $("#lblInputPassTitle").html("车门解锁");
    } else if (t == "PHOTO") {
        $("#lblInputPassTitle").html("设备拍照");
    } else if (t == "CheckLocation") {
        $("#lblInputPassTitle").html(mapPage.checkLocatoin);
    }

    if (t == "CheckLocation" || t == "Q001" || t == "PHOTO") {
        $("#txtInputpassword").val("000000");
        document.getElementById("txtInputpassword").disabled = true;
    } else {
        $("#txtInputpassword").val("");
        document.getElementById("txtInputpassword").disabled = false;
    }
    $("#spanPassDeviceName").html(name);
    showDiv('divInputPass');
}

function showSOSPassword(id, t, name, sn, model) {
    $("#txtSOSPhone").val("");
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    $("#spanSOSDeviceName").html(name);
    showDiv('divSOSPhone');
    getPhones(id, 0);
}

function showCellPhone(id, t, name, sn, model) {
    $("#txtCellPhone1").val("");
    $("#txtCellPhone2").val("");
    $("#txtCellPhone3").val("");
    $("#txtCellPhone4").val("");
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    $("#spanCellPhoneDeviceName").html(name);
    showDiv('divCellPhone');
    getPhones(id, 1);
}

function showDeviceInterval(id, t, name, sn, model) {
    $("#txtSetInterval").val("");
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    $("#spanIntervalDeviceName").html(name);
    showDiv('divInterval');
}

function showSendTxt(id, t, name, sn, model) {
    $("#txtSendTxtContent").val("");
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    $("#spanSendTxtDeviceName").html(name);
    showDiv('divSendTxt');
}

function showSendCmd(id, t, name, sn, model) {
    $("#spanSendCmdTxtDeviceName").val("");
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    $("#spanSendCmdTxtDeviceName").html(name);
    showDiv('divSendCmd');
}


function getPhones(deviceid, t) {
    $.ajax({
        type: "post",
        url: "Ajax/DevicesAdditionalAjax.asmx/GetPhoneByDeviceID",
        contentType: "application/json",
        data: "{DeviceID:" + deviceid + ",TypeID:" + t + "}",
        dataType: "json",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {

            if (t == 0) {
                $("#txtSOSPhone").val(result.d);
            } else if (t == 1) {
                var arr = result.d.split(',');
                $("#txtCellPhone1").val(arr[0]);
                $("#txtCellPhone2").val(arr[1]);
                $("#txtCellPhone3").val(arr[2]);
                $("#txtCellPhone4").val(arr[3]);
            }

        }
    });
}


//验证密码
function sendCmdInfo() {
    //不用验证密码
    var loginUserID = $("#hidUserID").val();
    if (commandType == "CheckLocation" || commandType == "Q001" || commandType == "PHOTO") {
        $("#spanSendMsg").html(mapPage.sendMsg1);
        sendCommand(commandDeviceSN, commandDeviceID, commandType, 0, commandModel);
    } else {
        var pass = $("#txtInputpassword").val();
        if (pass == "") {
            alert(mapPage.passNull);
        } else {
            $("#spanSendMsg").html(mapPage.sendMsg1);
            $.ajax({
                type: "post",
                url: "Ajax/UsersAjax.asmx/ValidPassword",
                contentType: "application/json",
                data: "{UserID:" + loginUserID + ",Pass:'" + pass + "'}",
                dataType: "json",
                error: function (res) {
                    //alert(res.responseText);
                },
                success: function (result) {
                    var res = parseInt(result.d);
                    if (res == 1) {
                        var isMDDevices = '';
                        //判断是否明达设备
                        isMDDevices = commandType.substr(0, 2);
                        if (isMDDevices == "MD") {
                            commandPort = $("#selPort").val();
                            sendCommandMD(commandDeviceSN, commandDeviceID, commandType, 0, commandModel, commandPort);
                        }
                        else {
                            sendCommand(commandDeviceSN, commandDeviceID, commandType, 0, commandModel);
                        }
                    } else {
                        alert(mapPage.passError);
                        $("#spanSendMsg").html("");
                    }
                }
            });
        }
    }
}

function sendCommand(sn, deviceId, command, trueOrFalse, model) {
    //型号83是宏远协议
    if (model == 83) {
        model = 50;
    }
    //命令发送
    $.ajax({
        type: "post",
        url: "Ajax/CommandQueueAjax.asmx/SendCommand",
        contentType: "application/json",
        data: "{SN:'" + sn + "',DeviceID:" + deviceId + ",CommandType:'" + command + "',TrueOrFalse:'" + trueOrFalse + "',Model:" + model + "}",
        dataType: "json",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            var res = parseInt(result.d);
            if (res > 10) {
                $("#spanSendMsg").html(mapPage.sendSuccess);
                GetResponse(result.d, 0, 0);

            } else {
                var msg = "";
                if (res == -1) {
                    msg = mapPage.sendMsg2;
                } else if (res == 1) {
                    msg = mapPage.sendMsg3;
                } else if (res == 2) {
                    msg = mapPage.sendMsg4;
                } else if (res == 3) {
                    msg = mapPage.sendMsg5;
                }
                alert(msg);
                $("#spanSendMsg").html("");
            }

        }
    });
}





//尚锐标准协议用
function sendCmdPhone(t) {
    var phones = "";
    if (t == 0) {
        phones = $("#txtSOSPhone").val();
    } else if (t == 1) {
        phones = $("#txtCellPhone1").val() + "," + $("#txtCellPhone2").val() + "," + $("#txtCellPhone3").val() + "," + $("#txtCellPhone4").val();
    } else if (t == 2) {
        var seconds = $("#txtSetInterval").val();
        if (seconds == "") {
            return;
        } else if (parseInt(seconds) < 5) {
            alert("间隔不能小于5秒!");
            return;
        } else if (parseInt(seconds) > 9999) {
            alert("间隔不能大于9999秒!");
            return;
        }
        phones = seconds;
    } else if (t == 3) {
        var content = $("#txtSendTxtContent").val();
        if (content == "") {
            return;
        } else {
            phones = content;
        }
    }
    sendPhoneCommand(commandDeviceSN, commandDeviceID, commandType, commandModel, phones);
}


function sendPhoneCommand(sn, deviceId, command, model, phones) {

    //命令发送
    $.ajax({
        type: "post",
        url: "Ajax/CommandQueueAjax.asmx/SendCommandByPhone",
        contentType: "application/json",
        data: "{SN:'" + sn + "',DeviceID:" + deviceId + ",CommandType:'" + command + "',Model:" + model + ",Phones:'" + phones + "'}",
        dataType: "json",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            var res = parseInt(result.d);
            if (res > 10) {
                if (command == "BP11") {
                    $("#spanSendMsgSOS").html(mapPage.sendSuccess);
                    GetResponse(result.d, 0, 1);
                } else if (command == "BP05") {
                    GetResponse(result.d, 0, 2);
                    $("#spanSendMsgCellPhone").html(mapPage.sendSuccess);
                } else if (command == "BP07") {
                    $("#spanSendMsgInterval").html(mapPage.sendSuccess);
                    GetResponse(result.d, 0, 3);
                } else if (command == "BP13") {
                    $("#spanSendMsgTxt").html(mapPage.sendSuccess);
                    GetResponse(result.d, 0, 4);
                }

            } else {
                var msg = "";
                if (res == -1) {
                    msg = mapPage.sendMsg2;
                } else if (res == 1) {
                    msg = mapPage.sendMsg3;
                } else if (res == 2) {
                    msg = mapPage.sendMsg4;
                } else if (res == 3) {
                    msg = mapPage.sendMsg5;
                }
                alert(msg);
                if (command == "BP11") {
                    $("#spanSendMsgSOS").html("");
                } else if (command == "BP05") {
                    $("#spanSendMsgCellPhone").html("");
                } else if (command == "BP07") {
                    $("#spanSendMsgInterval").html("");
                } else if (command == "BP13") {
                    $("#spanSendMsgTxt").html("");
                }
            }

        }
    });
}

//明达下发
function sendCommandMD(sn, deviceId, command, trueOrFalse, model, port) {
    //命令发送
    $.ajax({
        type: "post",
        url: "Ajax/CommandQueueAjax.asmx/SendCommandMD",
        contentType: "application/json",
        data: "{SN:'" + sn + "',DeviceID:" + deviceId + ",CommandType:'" + command + "',TrueOrFalse:'" + trueOrFalse + "',Model:" + model + ",Port:" + port + "}",
        dataType: "json",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            var res = parseInt(result.d);
            if (res > 10) {
                $("#spanSendMsg").html(mapPage.sendSuccess);
                GetResponse(result.d, 0, 0);

            } else {
                var msg = "";
                if (res == -1) {
                    msg = mapPage.sendMsg2;
                } else if (res == 1) {
                    msg = mapPage.sendMsg3;
                } else if (res == 2) {
                    msg = mapPage.sendMsg4;
                } else if (res == 3) {
                    msg = mapPage.sendMsg5;
                }
                alert(msg);
                $("#spanSendMsg").html("");
            }

        }
    });
}


function GetResponse(id, index, t) {
    var TimeZone = $("#hidTimeZone").val();
    $.ajax({
        type: "post",
        url: "Ajax/CommandQueueAjax.asmx/GetResponse",
        contentType: "application/json",
        data: "{CommandID:" + id + ",TimeZones:'" + TimeZone + "'}",
        dataType: "json",
        success: function (result) {
            index++;
            var str = result.d;
            if (str == "" || str == null || str == "null" || str == undefined) {
                if (index == 3) {
                    alert(mapPage.responseNull);
                    if (t == 0) {
                        $("#spanSendMsg").html("");
                        closeDiv('divInputPass');
                    } else if (t == 1) {
                        $("#spanSendMsgSOS").html("");
                        $("#txtSOSPhone").val("");
                        closeDiv('divSOSPhone');
                    } else if (t == 3) {
                        $("#spanSendMsgInterval").html("");
                        $("#txtSetInterval").val("");
                        closeDiv('divInterval');
                    } else if (t == 4) {
                        $("#spanSendMsgTxt").html("");
                        $("#txtSendTxtContent").val("");
                        closeDiv('divSendTxt');
                    } else if (t == 2) {
                        $("#spanSendMsgCellPhone").html("");
                        $("#txtCellPhone1").val("");
                        $("#txtCellPhone2").val("");
                        $("#txtCellPhone3").val("");
                        $("#txtCellPhone4").val("");
                        closeDiv('divCellPhone');
                    }
                } else {
                    setTimeout(function () {
                        GetResponse(id, index, t);
                    }, 8000);
                }
            } else {
                var cxaStr = mapPage.responseSuccess + str;
                alert(cxaStr);

                if (t == 0) {
                    $("#spanSendMsg").html("");
                    closeDiv('divInputPass');
                } else if (t == 1) {
                    $("#spanSendMsgSOS").html("");
                    $("#txtSOSPhone").val("");
                    closeDiv('divSOSPhone');
                } else if (t == 2) {
                    $("#spanSendMsgCellPhone").html("");
                    $("#txtCellPhone1").val("");
                    $("#txtCellPhone2").val("");
                    $("#txtCellPhone3").val("");
                    $("#txtCellPhone4").val("");
                    closeDiv('divCellPhone');
                } else if (t == 3) {
                    $("#spanSendMsgInterval").html("");
                    $("#txtSetInterval").val("");
                    closeDiv('divInterval');
                } else if (t == 4) {
                    $("#spanSendMsgTxt").html("");
                    $("#txtSendTxtContent").val("");
                    closeDiv('divSendTxt');
                }
            }
        }, error: function (e) {
            alert(mapPage.responseNull);

            if (t == 0) {
                $("#spanSendMsg").html("");
                closeDiv('divInputPass');
            } else if (t == 1) {
                $("#spanSendMsgSOS").html("");
                $("#txtSOSPhone").val("");
                closeDiv('divSOSPhone');
            } else if (t == 2) {
                $("#spanSendMsgCellPhone").html("");
                $("#txtCellPhone1").val("");
                $("#txtCellPhone2").val("");
                $("#txtCellPhone3").val("");
                $("#txtCellPhone4").val("");
                closeDiv('divCellPhone');
            } else if (t == 3) {
                $("#spanSendMsgInterval").html("");
                $("#txtSetInterval").val("");
                closeDiv('divInterval');
            } else if (t == 4) {
                $("#spanSendMsgTxt").html("");
                $("#txtSendTxtContent").val("");
                closeDiv('divSendTxt');
            }
        }
    });
}

function showCommandList(id, sn, pageNo) {

    showDiv('divCommandList');
    var TimeZone = $("#hidTimeZone").val();
    $.ajax({
        type: "post",
        url: "Ajax/CommandQueueAjax.asmx/GetCommandList",
        contentType: "application/json",
        data: "{SN:'" + sn + "',DeviceID:" + id + ",PageNo:" + pageNo + ",PageCount:" + pageCount + ",TimeZones:'" + TimeZone + "'}",
        dataType: "json",
        success: function (result) {
            if (result.d != "") {
                writeCommandTable(eval("(" + result.d + ")"));
            }
        }, error: function (res) {
            //alert(res.responseText);
        }
    });
}

function showDivIframe(url, id) {
    var randomnumber = Math.floor(Math.random() * 100000);
    if (url == "ProductUpdate.aspx") {
        $("#spanIframeTitle").html(mapPage.divicesInfo);
        $("#divIframe").css("height", "368px");
        $("#ifmPage").attr("height", "340");
        $("#ifmPage").attr("src", url + "?deviceid=" + id + "&randon=" + randomnumber);
    } else if (url == "DownloadLocation.aspx") {
        $("#spanIframeTitle").html(mapPage.downloadLocation);
        $("#divIframe").css("height", "390px");
        $("#ifmPage").attr("height", "340");
        $("#ifmPage").attr("src", url + "?id=" + UserId + "&deviceid=" + id + "&randon=" + randomnumber);
    }
    showDiv("divIframe");
}

function writeCommandTable(json) {
    var html = [];
    html.push('<table width="100%" border="0" cellspacing="1" cellpadding="0" class="tab">');
    html.push('<tbody>');
    html.push('<tr height="25" style="background:#F5F5F5;font-weight:bold;">');
    html.push('<td align="center" width="25">' + allPage.num + '</td>');
    html.push('<td align="center" height="25" width="80">' + mapPage.cmdType + '</td>'); //指令类型
    html.push('<td align="center" width="90">' + mapPage.cmdState + '</td>'); //状态
    html.push('<td align="center">' + mapPage.responseText + '</td>'); //响应信息
    html.push('<td align="center" width="130">' + mapPage.responseTime + '</td>'); //响应时间
    html.push('<td align="center" width="130">' + mapPage.sendTime + '</td>'); //发送时间
    html.push('</tr>');
    if (json.commandArr.length == 0) {//没有查询到数据
        html.push('<td align="center" height="25" colspan="6" style="color:#ff0000;">' + allPage.noData + '</td>');
    } else {
        var nowPage = parseInt(json.nowPage);
        var start = (nowPage - 1) * pageCount + 1;
        for (var i = 0; i < json.commandArr.length; i++) {

            var commandName = json.commandArr[i].commandName;
            if (commandName == "CheckLocation" || commandName == "Q001") {
                commandName = mapPage.checkLocation;
            } else if (commandName == "HFYD" || commandName == "C001OFF") {
                commandName = mapPage.hfyd;
            } else if (commandName == "DYD" || commandName == "C001ON") {
                commandName = mapPage.dyd;
            } else if (commandName == "BP020") {
                commandName = "远程设防";
            } else if (commandName == "BP021") {
                commandName = "远程撤防";
            } else if (commandName == "BP030") {
                commandName = "远程断油";
            } else if (commandName == "BP040") {
                commandName = "远程恢复油";
            } else if (commandName == "BP05") {
                commandName = "设置亲情号码";
            } else if (commandName == "BP11") {
                commandName = "设置SOS号码";
            } else if (commandName == "BP120") {
                commandName = "监听开启";
            } else if (commandName == "BP121") {
                commandName = "监听关闭";
            } else if (commandName == "BP07") {
                commandName = "上传间隔";
            } else if (commandName == "BP13") {
                commandName = "下发文字";
            } else if (commandName == "UserSend") {
        commandName = "UserSend";
               // commandName = "用户下发";
            }

            var state = "";
            var responseMsg = "";
            var responseDate = "";
            var sendDate = "";
            if (json.commandArr[i].isResponse == 1) {
                state = mapPage.deviceResponse;
                responseMsg = json.commandArr[i].responseText;
                responseDate = json.commandArr[i].responseDate;
                sendDate = json.commandArr[i].sendDate;
            } else if (json.commandArr[i].isSend == 1) {
                state = mapPage.sendSuccess2;
                sendDate = json.commandArr[i].sendDate;
            } else {
                state = mapPage.noSend;
            }

            html.push('<tr height="25" onmouseover=\'this.style.backgroundColor="#FAFAFA";\' onmouseout="this.style.backgroundColor=\'\';">');
            html.push('<td align="center">' + (start + i) + '</td>');
            html.push('<td align="center">' + commandName + '</td>');
            html.push('<td align="center">' + state + '</td>');
            html.push('<td width=\"360\" style=\"word-break:break-all;over-flow:hidden;\" >' + responseMsg + '</td>');
            html.push('<td align="center">' + responseDate + '</td>');
            html.push('<td align="center">' + sendDate + '</td>');
            html.push('</tr>');
        }
        var pageStr = "";
        var size = parseInt(json.resSize);
        var pageSize = size % pageCount == 0 ? size / pageCount : size / pageCount + 1;
        pageStr = showCheckCommand(parseInt(json.deviceID), json.sn, json.nowPage, pageSize);
        html.push('<tr><td colspan="6" bgcolor="#FFFFFF" align="center">' + pageStr + '</td></tr>');
    }
    html.push('</tbody>');
    html.push('</table>');
    $("#divCommandListTable").html(html.join(''));
}

function searchInput(t) {
    var input = $("#txtSearchInput").val();
    if (t == "f") {
        if (input == mapPage.searchInput) {
            $("#txtSearchInput").val('');
            input = "";
        }
        showSearchDevices(input);
        $("#divLeftSearchDevices").show();
    } else {
        if (input == '') {
            $("#txtSearchInput").val(mapPage.searchInput);
        }
        $("#divLeftSearchDevices").hide();
    }
}

function searchInput2() {
    var display = document.getElementById("divLeftSearchDevices");
    if (display.style.display == "block" || display.style.display == "") {
        $("#divLeftSearchDevices").hide();
    } else {
        var sTxt = $("#txtSearchInput").val();
        if (sTxt == mapPage.searchInput) {
            sTxt = "";
        }
        //showSearchDevices(sTxt);
        $("#divLeftSearchDevices").show();
    }
}

function showSearchDevices(n) {
    if (allDevices) {
        likeSearch(n, allDevices);
    }
}

//模糊搜索,设备名,车牌号
function likeSearch(searchStr, arr) {
    var html = [];
    html.push('<table width="100%" border="0">');
    for (var i = 0; i < arr.devices.length; i++) {
        var isShow = false;
        var deviceName = arr.devices[i].name;
        var sn = arr.devices[i].sn;
        if (searchStr != "") {
            if (deviceName.indexOf(searchStr) != -1) {
                isShow = true;
            }
            if (sn.indexOf(searchStr) != -1) {
                isShow = true;
            }
        } else {
            isShow = true;
        }
        if (isShow) {
            var state = arr.devices[i].status;
            html.push('<tr style="cursor:pointer;" onclick="searchTableClk(' + arr.devices[i].id + ',\'' + deviceName + '\',\'' + state + '\')"><td>' + deviceName + '</td></tr>');
        }
    }
    html.push('</table>');
    $("#divLeftSearchDevices").html(html.join(''));
}

function searchTableClk(id, name, state) {
    if (state != "LoggedOff") {
        showMoreDivDevice(id, 1);
        $("#divLeftSearchDevices").hide();
        $("#txtSearchInput").val(name)
    }
}

function showDiv(id) {
    closeOpenShow();
    $("#" + id).show();
}

function closeDiv(id) {
    $("#" + id).hide();
    if (id == "divCommandList") {
        $("#divCommandListTable").html("");
    }
}

function closeOpenShow() {
    $("#divCommandList").hide();
    $("#divInputPass").hide();
    $("#divSOSPhone").hide();
    $("#divCellPhone").hide();
    $("#divInterval").hide();
    $("#divSendTxt").hide();
}



function openPage(url, userid, deviceid) {
    //var maptype = ifmMap.window.document.getElementById("selMap").value;
    var p = IDEncryption(deviceid);
    var openUrl = url + "?id=" + userid + '&deviceid=' + deviceid + "&p=" + p;
    window.open(openUrl);
}


function clkInputGroup(t) {
    if (t == 0) {
        $("#divAddGroup").hide();
        $("#divInputGroup").show();
    } else if (t == 1) {
        $("#divInputGroup").hide();
        $("#divAddGroup").show();
    }
}

//给点击的用户创建分组
function saveGroup() {
    var inputGroupName = $("#txtGroupName").val();
    if (inputGroupName != "") {
        $.ajax({
            type: "post",
            url: "Ajax/GroupsAjax.asmx/AddGroup",
            contentType: "application/json",
            data: "{UserID:" + UserId + ",GroupName:'" + inputGroupName + "'}",
            dataType: "json",
            success: function (result) {
                var res = parseInt(result.d);
                if (res > 0) {
                    $("#txtGroupName").val("");
                    clkInputGroup(1);

                    var html = [];
                    var id = "divGroup-" + res;
                    var spanID = "spanGroup-" + res;
                    var spanNameID = "spanGroupName-" + res;
                    var divEditID = "divEditGroup-" + res;
                    var inputID = "editGroup-" + res;
                    var divMainID = "divMainGroup-" + res;
                    html.push('<div id="' + divMainID + '" style="clear:left; height:25px;padding-top:5px;padding-bottom:5px;border-bottom:1px #F2F2F2 solid;">');
                    html.push('<div style="float:left;width:140px;">&nbsp;<img src="../../images/g_o.gif" width="11" height="11" border="0" style="cursor:pointer;" onclick="displyGroupDiv(this,\'' + id + '\');" />&nbsp;');
                    html.push('<span id="' + spanNameID + '">' + inputGroupName + '</span><input id="' + inputID + '" onblur="saveGroupName(' + res + ');" style="width:80px;display:none;" />');
                    html.push('(<span id="' + spanID + '">0</span>)</div>');
                    html.push('<div id="' + divEditID + '" style="float:left;display:none;"><a href="javascript:void(0);" onclick="editGroupName(' + res + ');">' + allPage.edit2 + '</a>&nbsp;&nbsp;<a href="javascript:void(0);" onclick="comfirmDelGroup(' + res + ',\'' + inputGroupName + '\');">' + allPage.deletes + '</a></div>');
                    html.push('</div>');
                    html.push('<div id="' + id + '" style="clear:left;">');
                    html.push("</div>");

                    allGroupsDivIDs.push(id);
                    $("#divDevicesTable").append(html.join(''));
                    addGroupMouse(divMainID, divEditID);
                    var str = "{id:" + res + ",name:'" + inputGroupName + "'}";
                    allGroups.push(eval("(" + str + ")"));
                    //重新加载移至分组的列表
                    //showGroupMenuItems();
                }
            }, error: function (res) {
                //alert(res.responseText);
            }
        });
    }
}

//获取用户的设备分组
function getGroup() {
    var html = [], divMainIDs = [], divEditIDs = [];
    html.push('<div style="clear:left; height:25px;padding-top:5px;padding-bottom:5px;border-bottom:1px #F2F2F2 solid;">&nbsp;<img src="../../images/g_o.gif" width="11" height="11" border="0" style="cursor:pointer;" onclick="displyGroupDiv(this,\'' + "divGroup-0" + '\');" />&nbsp;' + mapPage.defaultGroup + '(<span id="spanGroup-0">0</span>)');
    html.push('</div>');
    html.push('<div id="divGroup-0">');
    html.push("</div>");
    allGroupsDivIDs.push("divGroup-0");

    $.ajax({
        type: "post",
        url: "http://192.168.1.35:84/json/GetAllGroupByUserID.json",
        contentType: "application/json",
        data: "{UserID:" + UserId + "}",
        dataType: "json",
        success: function (result) {
            if (result.d != "") {
                var json = eval("(" + result.d + ")");
                allGroups = json.arr;
                for (var i = 0; i < allGroups.length; i++) {
                    var id = "divGroup-" + allGroups[i].id;
                    var spanID = "spanGroup-" + allGroups[i].id;
                    var spanNameID = "spanGroupName-" + allGroups[i].id;
                    var divEditID = "divEditGroup-" + allGroups[i].id;
                    var inputID = "editGroup-" + allGroups[i].id;
                    var divMainID = "divMainGroup-" + allGroups[i].id;
                    html.push('<div id="' + divMainID + '" style="clear:left; height:20px;padding-top:5px;padding-bottom:5px;border-bottom:1px #F2F2F2 solid;">'); //
                    html.push('<div style="float:left;width:140px;">&nbsp;<img src="../../images/g_o.gif" width="11" height="11" border="0" style="cursor:pointer;" onclick="displyGroupDiv(this,\'' + id + '\');" />&nbsp;');
                    html.push('<span id="' + spanNameID + '">' + allGroups[i].name + '</span><input id="' + inputID + '" onblur="saveGroupName(' + allGroups[i].id + ');" style="width:80px;display:none;" />');
                    html.push('(<span id="' + spanID + '">0</span>)</div>');
                    html.push('<div id="' + divEditID + '" style="float:left;display:none;"><a href="javascript:void(0);" onclick="editGroupName(' + allGroups[i].id + ');">' + allPage.edit2 + '</a>&nbsp;&nbsp;<a href="javascript:void(0);" onclick="comfirmDelGroup(' + allGroups[i].id + ',\'' + allGroups[i].name + '\');">' + allPage.deletes + '</a></div>');
                    html.push('</div>');
                    html.push('<div id="' + id + '" style="clear:left;">');
                    html.push("</div>");

                    divMainIDs.push(divMainID);
                    divEditIDs.push(divEditID);
                    allGroupsDivIDs.push(id);
                }
            }
            //showGroupMenuItems();
            $("#divDevicesTable").html(html.join(''));
            for (var i = 0; i < divMainIDs.length; i++) {
                var divMainID = divMainIDs[i];
                var divEditID = divEditIDs[i];
                addGroupMouse(divMainID, divEditID);
            }
            initGetDevices();
        }, error: function (res) {
            //alert(res.responseText);
            $("#divDevicesTable").html(html.join(''));
            //showGroupMenuItems();
            initGetDevices();
        }
    });
}

function addGroupMouse(divMainID, divEditID) {
    $("#" + divMainID).mouseover(function () {
        if (!groupInput) {
            $("#" + divEditID).show();
        }
    }).mouseleave(function () {
        if (!groupInput) {
            $("#" + divEditID).hide();
        }
    });

}

function showGroupMenuItems() {
    $("#divLeftMenuGroup").html("");
    var grouphtml = [];
    grouphtml.push('<div style="margin-top:5px;">');
    grouphtml.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);" onclick="moveGroup(' + "-1" + ');">' + mapPage.defaultGroup + '</a></div>');
    for (var i = 0; i < allGroups.length; i++) {
        grouphtml.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);" onclick="moveGroup(' + allGroups[i].id + ');">' + allGroups[i].name + '</a></div>');
    }
    grouphtml.push('</div>');
    $("#divLeftMenuGroup").html(grouphtml.join(''));
}

function clearGroupDivTxt() {
    $("#divGroup-0").html("");
    $("#spanGroup-0").html("0");
    for (var i = 0; i < allGroups.length; i++) {
        $("#divGroup-" + allGroups[i].id).html("");
        $("#spanGroup-" + allGroups[i].id).html("0");
    }
}
var groupInput = false;
function editGroupName(id) {
    groupInput = true;
    $("#spanGroupName-" + id).hide();
    $("#editGroup-" + id).val($("#spanGroupName-" + id).html()).show();
    document.getElementById("editGroup-" + id).focus();
    $("#divEditGroup-" + id).hide();
}

function saveGroupName(id) {
    groupInput = false;
    var oldStr = $("#spanGroupName-" + id).html();
    var newStr = $("#editGroup-" + id).val();
    if (oldStr != newStr) {
        $.ajax({
            type: "post",
            url: "Ajax/GroupsAjax.asmx/UpdateGroupName",
            contentType: "application/json",
            data: "{GroupID:" + id + ",GroupName:'" + newStr + "'}",
            dataType: "json",
            success: function (result) {
                var res = parseInt(result.d);
                if (res > 0) {
                    $("#spanGroupName-" + id).html(newStr);
                    for (var i = 0; i < allGroups.length; i++) {
                        if (allGroups[i].id == id) {
                            allGroups[i].name = newStr;
                            break;
                        }
                    }
                    //重新加载移至分组的列表
                    //showGroupMenuItems();
                }
            }, error: function (res) {
                //alert(res.responseText);
            }
        });
    }
    $("#editGroup-" + id).hide();
    $("#spanGroupName-" + id).show();
}

//编辑name状态下,禁用
function showGroupDiv(id) {
    if (!groupInput) {
        $("#" + id).show();
    }
}

function closeGroupDiv(id) {
    if (!groupInput) {
        $("#" + id).hide();
    }
}


function displyGroupDiv(t, id) {
    var display = document.getElementById(id).style.display;
    if (display == "block" || display == "") {
        t.src = "../../images/g_c.gif";
        document.getElementById(id).style.display = "none";
    } else {
        t.src = "../../images/g_o.gif";
        document.getElementById(id).style.display = "block";
    }
}
function showMoveGroup(deviceID) {
    //if (intervalGroupItem) clearInterval(intervalGroupItem);
    //$("#divLeftMenuGroup").css({ "marginTop": mousetop - 5, "marginLeft": mouseleft + 20 }).show();
    $("#divLeftMenuGroup").show();
}

function hideMoveGroup() {
    $("#divLeftMenuGroup").hide();
}

function moveGroup(groupID) {
    if (clkGroupItemDeviceID > 0) {
        $.ajax({
            type: "post",
            url: "Ajax/DevicesAjax.asmx/UpdateDeviceGroupID",
            contentType: "application/json",
            data: "{DeviceID:" + clkGroupItemDeviceID + ",GroupID:" + groupID + "}",
            dataType: "json",
            success: function (result) {
                var res = parseInt(result.d);
                if (res > 0) {
                    ajaxGetDevices();
                }
            }, error: function (res) {
                //alert(res.responseText);
            }
        });
    }
}

function comfirmDelGroup(groupID, groupName) {
    var name = groupName;
    for (var i = 0; i < allGroups.length; i++) {
        if (allGroups[i].id == groupID) {
            name = allGroups[i].name;
            break;
        }
    }
    return confirm(cusPage.delUserConfirm + name + mapPage.delGroupConfirm) ? delGroup(groupID) : void (0);
}

function delGroup(groupID) {
    if (groupID > 0) {
        $.ajax({
            type: "post",
            url: "Ajax/GroupsAjax.asmx/DelGroup",
            contentType: "application/json",
            data: "{GroupID:" + groupID + "}",
            dataType: "json",
            success: function (result) {
                var res = parseInt(result.d);
                if (res > 0) {
                    initUserDevices(); 
                    getGroup();
                }
            }, error: function (res) {
                //alert(res.responseText);
            }
        });
    }
}

//隐藏左边栏
function showHideLeft() {
    var left = $("#divLeft").css("width");
    var leftWidth = 260;
    var mWidth = 255;
    if (left == "260px") {
        leftWidth = 0;
        mWidth = 0;
        $("#divMenuLeftImg").css("left", 0 + "px");
        //$("#imgProductSearch").hide();
        $("#divLeftSearchDevices").hide();
        $("#imgProductSearch").css("marginLeft", -500 + "px");
    } else {
        $("#divMenuLeftImg").css("left", 260 + "px");
        $("#imgProductSearch").css("marginLeft", -22 + "px");
    }
    var p = $("#divMenuLeftImg").css("backgroundPositionX");
    if (p == "11px" || p == "22px") {
        $("#divMenuLeftImg").css("backgroundPositionX", "33px");
    } else {
        $("#divMenuLeftImg").css("backgroundPositionX", "22px");
    }
    $("#divLeft").css("width", leftWidth + "px");
    var w = $(this).width() - 30;
    var mapWidth = w - mWidth;
    $("#ifmMap").css("width", mapWidth + "px");
}

function overMenuLeft() {
    var p = $("#divMenuLeftImg").css("backgroundPositionX");
    if (p == "33px") {
        $("#divMenuLeftImg").css("backgroundPositionX", "44px");
    } else if (p == "22px") {
        $("#divMenuLeftImg").css("backgroundPositionX", "11px");
    }
}

function outMenuLeft() {
    var p = $("#divMenuLeftImg").css("backgroundPositionX");
    if (p == "44px") {
        $("#divMenuLeftImg").css("backgroundPositionX", "33px");
    } else if (p == "11px") {
        $("#divMenuLeftImg").css("backgroundPositionX", "22px");
    }
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


function strIsSChinese(strTemp) {
    var isCn = false;
    for (i = 0; i < strTemp.length; i++) {
        if ((strTemp.charCodeAt(i) >= 0) && (strTemp.charCodeAt(i) <= 255)) {

        }
        else {
            isCn = true;
        }
    }
    return isCn;
}




//验证密码
function sendDIYCmdInfo(sendText) {
    //不用验证密码
    var loginUserID = $("#hidUserID").val();
    var pass = $("#CmdPassWord").val();
    if (pass == "") {
        alert(mapPage.passNull);
    } else {
        $("#spanSendCmdTxt").html(mapPage.sendMsg1);
        $.ajax({
            type: "post",
            url: "Ajax/UsersAjax.asmx/ValidPassword",
            contentType: "application/json",
            data: "{UserID:" + loginUserID + ",Pass:'" + pass + "'}",
            dataType: "json",
            error: function (res) {
                $("#spanSendCmdTxt").html(res.responseText);
                //alert(res.responseText);
            },
            success: function (result) {
                var res = parseInt(result.d);
                if (res == 1) {
                    var isMDDevices = '';
                    sendDIYCommand(commandDeviceSN, commandDeviceID, sendText, commandModel);
                } else {
                    alert(mapPage.passError);
                    $("#spanSendCmdTxt").html("");
                }
            }
        });
    }

}

function sendDIYCommand(sn, deviceId, command, model) {

    //命令发送
    $.ajax({
        type: "post",
        url: "Ajax/CommandQueueAjax.asmx/SendDiyCommand",
        contentType: "application/json",
        data: "{SN:'" + sn + "',DeviceID:" + deviceId + ",CommandType:'" + command + "',Model:'" + model + "'}",
        dataType: "json",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            var res = parseInt(result.d);
            if (res > 10) {
                $("#spanSendCmdTxt").html(mapPage.sendSuccess);
                GetResponse(result.d, 0, 0);

            } else {
                var msg = "";
                if (res == -1) {
                    msg = mapPage.sendMsg2;
                } else if (res == 1) {
                    msg = mapPage.sendMsg3;
                } else if (res == 2) {
                    msg = mapPage.sendMsg4;
                } else if (res == 3) {
                    msg = mapPage.sendMsg5;
                }
                alert(msg);
                $("#spanSendCmdTxt").html("");
            }

        }
    });
}
