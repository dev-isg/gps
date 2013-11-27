var id = 0;
var loginName = "";
$(document).ready(function () {
    syncSize();
    id = $("#hidUserID").val();
    loginName = $("#hidLoginName").val();
    loginName = encodeURIComponent(loginName);
    $("#MainBox").attr("src", "http://192.168.1.35:84/application/index/map?id=" + id + "&n=" + loginName);
    $("#divExceptionMessageDiv").easydrag();
    $("#divExceptionMessageDiv").setHandler("divExceptionMessageDivTitle");
    $("#tdMore").bind("mouseleave", function () {
        closeDiv('divMore');
    });

    $("#MenuBar1").find("td").click(function () {
        if ($(this).attr("url") != "") {
            if (id == 0) {
                id = $("#hidUserID").val();
            }
            if (loginName == "") {
                loginName = $("#hidLoginName").val();
                loginName = encodeURIComponent(loginName);
            }
            var url = $(this).attr("url") + "?id=" + id + "&n=" + loginName;
            $(this).removeClass().addClass("MenuBartd2").siblings().removeClass().addClass("MenuBartd1");
            $("#MainBox").attr("src", url);
        }
    });
 
    AjaxGetExceptionMessageCount();//第一次读取右上角数据
 

})
window.onresize = syncSize;

function syncSize() {
    var h = $(this).height() - 30;
    $("#MainBox").css("height", h + "px");

    var w = $(this).width() - 118;
   // $("#divMore").css("marginLeft", w + "px");

    var h2 = $(this).height() - 30;
    var w2 = $(this).width() - 410;
    $("#divExceptionMessageDiv").css("left", w2 + "px");
    $("#divExceptionMessageDiv").css("top", h2 + "px");
}


function ShowUserInfo(t) {
    if (id == 0) {
        id = $("#hidUserID").val();
    }
    if (loginName == "") {
        loginName = $("#hidLoginName").val();
        loginName = encodeURIComponent(loginName);
    }
    $("#MainBox").attr("src", "UserInfo.aspx?id=" + id + "&n=" + loginName + "&type=" + t);
}

function ClkShowPage(t) {

    var url = "";
    if (t == 9) {
        url = "UserInfo.aspx?id=" + id + "&n=" + loginName + "&type=" + 0;
    } else if (t == 10) {
        url = "UserInfo.aspx?id=" + id + "&n=" + loginName + "&type=" + 1;
    } else if (t == 1) {
        url = "DeviceList.aspx?id=" + id + "&n=" + loginName + "&sday=" + 0;
    } else if (t == 2) {
        url = "DeviceList.aspx?id=" + id + "&n=" + loginName + "&sday=" + 7;
    } else if (t == 3) {
        url = "DeviceList.aspx?id=" + id + "&n=" + loginName + "&sday=" + 60;
    } else if (t == 4) {
        url = "DeviceList.aspx?id=" + id + "&n=" + loginName + "&sday=" + -1;
    } else if (t == 11) {
        url = "WarnMessage.aspx?id=" + id + "&n=" + loginName;
    } else if (t == 12) {
        url = "MoneyTransaction.aspx?id=" + id + "&n=" + loginName;
    } else if (t == 13) {
        url = "MoneyReport.aspx?id=" + id + "&n=" + loginName;
    }
    $("#MainBox").attr("src", url);
}

function ShowMessage() {
    $("#MainBox").attr("src", "WarnMessage.aspx?id=" + id + "&n=" + loginName);
}

function showDiv(id) {

    $("#" + id).show();
}
function closeDiv(id) {
    $("#" + id).hide();
}