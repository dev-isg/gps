/*
* 显示页面数
* param(当前页,总页数,类型ID,参数ID,每页数))
* 如果总页面大于10 且选择的页面能被9整除的数时,页面数字翻页 显示如1 2 3 4 5 6 7 8 9 ... 22
* 如总页小于10或等于10 则显示 1 2 3 4 5 6 7 8 9 10 
*/
function showPageNum(pageNum, pageMaxSize, t, id, pageCount) {
    pageMaxSize = parseInt(pageMaxSize);
    var pageStr = "";
    var index = 1;
    if (pageMaxSize > 10) {
        if (index % 9 == 0) {
            index = pageNum;
        } else {
            index = parseInt(pageNum / 9);
            if (index == 0) {
                index = 1;
            } else {
                index = index * 9;
            }
        }
    }

    var forSize = index == 1 ? 10 : index + 9;
    if (index >= 9) {
        var sIndex = index - 9;
        if (sIndex == 0) {
            sIndex = 1;
        }
        if (t == 0) {
            pageStr += "<a href=\"javascript:void(0);\" style=\"color:#000000; font-size:12px; text-decoration:none;;\" onclick=\"ajaxGetDevices(" + id + "," + sIndex + "," + pageCount + ");\">&nbsp;" + sIndex + "</a>&nbsp;...";
        } else if (t == 1) {
            pageStr += "<a href=\"javascript:void(0);\" style=\"color:#000000; font-size:12px; text-decoration:none;;\" onclick=\"ajaxGetLowerUsers(" + id + "," + sIndex + "," + pageCount + ");\">&nbsp;" + sIndex + "</a>&nbsp;...";
        }
    }
    for (var i = index; i <= forSize && i <= pageMaxSize; i++) {
        if (i == pageNum) {
            pageStr += "<a href=\"javascript:void(0);\" style=\"color:#FF0000; font-size:12px; text-decoration:none;;\">&nbsp;" + i + "&nbsp;</a>";
        } else {
            if (t == 0) {
                pageStr += "<a href=\"javascript:void(0);\" style=\"color:#000000; font-size:12px; text-decoration:none;;\" onclick=\"ajaxGetDevices(" + id + "," + i + "," + pageCount + ");\">&nbsp;" + i + "&nbsp;</a>";
            } else if (t == 1) {
                pageStr += "<a href=\"javascript:void(0);\" style=\"color:#000000; font-size:12px; text-decoration:none;;\" onclick=\"ajaxGetLowerUsers(" + id + "," + i + "," + pageCount + ");\">&nbsp;" + i + "&nbsp;</a>";
            }
        }
    }
    if (pageMaxSize > (index + 9)) {
        if (t == 0) {
            pageStr += "......<a href=\"javascript:void(0);\" style=\"color:#000000; font-size:12px; text-decoration:none;;\" onclick=\"ajaxGetDevices(" + id + "," + pageMaxSize + "," + pageCount + ");\">&nbsp;" + pageMaxSize + "&nbsp;</a>";
        } else if (t == 1) {
            pageStr += "......<a href=\"javascript:void(0);\" style=\"color:#000000; font-size:12px; text-decoration:none;;\" onclick=\"ajaxGetLowerUsers(" + id + "," + pageMaxSize + "," + pageCount + ");\">&nbsp;" + pageMaxSize + "&nbsp;</a>";
        }
    }


    return pageStr;
}


function showDeviceListPageNum(id, userID, pageNum, pageMaxSize, expDays) {
    pageMaxSize = parseInt(pageMaxSize);
    var pageStr = "";
    var index = 1;
    if (pageMaxSize > 10) {
        if (index % 9 == 0) {
            index = pageNum;
        } else {
            index = parseInt(pageNum / 9);
            if (index == 0) {
                index = 1;
            } else {
                index = index * 9;
            }
        }
    }

    if (index >= 9) {
        var sIndex = index - 9;
        if (sIndex == 0) {
            sIndex = 1;
        }
        pageStr += "<a href=\"javascript:void(0);\" style=\"color:#000000; font-size:12px; text-decoration:none;;\" onclick=\"ajaxGetDevices('" + id + "'," + userID + "," + sIndex + "," + expDays + ");\">&nbsp;" + sIndex + "</a>&nbsp;...";
    }
    var forSize = index == 1 ? 10 : index + 9;
    for (var i = index; i <= forSize && i <= pageMaxSize; i++) {
        if (i == pageNum) {
            pageStr += "<a href=\"javascript:void(0);\" style=\"color:#FF0000; font-size:12px; text-decoration:none;;\">&nbsp;" + i + "&nbsp;</a>";
        } else {
            pageStr += "<a href=\"javascript:void(0);\" style=\"color:#000000; font-size:12px; text-decoration:none;;\" onclick=\"ajaxGetDevices('" + id + "'," + userID + "," + i + "," + expDays + ");\">&nbsp;" + i + "&nbsp;</a>";
        }
    }
    if (pageMaxSize > (index + 9)) {
        pageStr += "......<a href=\"javascript:void(0);\" style=\"color:#000000; font-size:12px; text-decoration:none;;\" onclick=\"ajaxGetDevices('" + id + "'," + userID + "," + pageMaxSize + "," + expDays + ");\">&nbsp;" + pageMaxSize + "&nbsp;</a>";
    }


    return pageStr;
}



function showCheckCommand(id, sn, pageNum, pageMaxSize) {
    var pageStr = "";
    var index = 1;
    if (pageMaxSize > 10) {
        if (index % 9 == 0) {
            index = pageNum;
        } else {
            index = parseInt(pageNum / 9);
            if (index == 0) {
                index = 1;
            } else {
                index = index * 9;
            }
        }
    }

    if (index >= 9) {
        var sIndex = index - 9;
        if (sIndex == 0) {
            sIndex = 1;
        }
        pageStr += "<a href=\"javascript:void(0);\" style=\"color:#000000; font-size:12px; text-decoration:none;;\" onclick=\"showCommandList(" + id + ",'" + sn + "'," + sIndex + ");\">&nbsp;" + sIndex + "</a>&nbsp;...";
    }
    var forSize = index == 1 ? 10 : index + 9;
    for (var i = index; i <= forSize && i <= pageMaxSize; i++) {
        if (i == pageNum) {
            pageStr += "<a href=\"javascript:void(0);\" style=\"color:#FF0000; font-size:12px; text-decoration:none;;\">&nbsp;" + i + "&nbsp;</a>";
        } else {
            pageStr += "<a href=\"javascript:void(0);\" style=\"color:#000000; font-size:12px; text-decoration:none;;\" onclick=\"showCommandList(" + id + ",'" + sn + "'," + i + ");\">&nbsp;" + i + "&nbsp;</a>";
        }
    }
    if (pageMaxSize > (index + 9)) {
        pageStr += "......<a href=\"javascript:void(0);\" style=\"color:#000000; font-size:12px; text-decoration:none;;\" onclick=\"showCommandList(" + id + ",'" + sn + "'," + pageMaxSize + ");\">&nbsp;" + pageMaxSize + "&nbsp;</a>";
    }
    return pageStr;
}