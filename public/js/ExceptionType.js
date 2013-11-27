function getExceptionMessageType(noticeId,geofenceName) {

    var em = "";
    if (noticeId == 1) {
        em = alarmIndexPage.geofenceIn + "(" + geofenceName + ")";
    } else if (noticeId == 2) {
        em = alarmIndexPage.geofenceOut + "(" + geofenceName + ")";
    } else if (noticeId == 3) {
        em = alarmIndexPage.lowBattery;
    } else if (noticeId == 4) {
        em = alarmIndexPage.overSpeed;
    } else if (noticeId == 5) {
        em = alarmIndexPage.sos;
    } else if (noticeId == 6) {
        em = alarmIndexPage.cutPower;
    } else if (noticeId == 7) {
        em = alarmIndexPage.vibration;
    } else if (noticeId == 8) {
        em = alarmIndexPage.moved;
    } else if (noticeId == 9) {
        em = alarmIndexPage.offline;
    } else if (noticeId == 10) {
        em = "疲劳驾驶";
    } else if (noticeId == 11) {
        em = "车辆VSS故障";
    } else if (noticeId == 12) {
        em = "车辆油量异常";
    } else if (noticeId == 13) {
        em = "路线偏离报警";
    } else if (noticeId == 14) {
        em = "车辆非法点火";
    } else if (noticeId == 15) {
        em = "设备故障";
    }
    return em;

}
