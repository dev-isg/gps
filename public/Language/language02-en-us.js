function writePage(msg) {
    document.write(msg);
}

var allPage = { tab1: "Moving Overview", tab2: "Alarm Overview", tab3: "Device Statistics", tab4: "Alarm Details", startTime: "From", endTime: "To", search: "Search", num: "No.", deviceName: "Target Name",
    time: "Time", distance: "Mileage (km)", overspeed: "Overspeed", noData: "No data!", lat: "Lat", lng: "Lon", speed: "Speed", address: "Address", speedKM: "km/h", day: "Day", hour: "Hour",
    minute: "Minutes", pleSel: "Please select", date: "Date", plsDeviceMsg: "Please select the target", address: "Address", moreDevice: "More", msg: "Message", myAccount: "My account", changePass: "Change password",
    tracking: "Tracking", playback: "Playback", monitor: "Monitor", home: "Home", customer: "Customer", report: "Statistics", more: "More", all: "All", no: "No.", name: "Name", carNum: "License Plate No.",
    imeiNo: "IMEI No.", activeTime: "Activation time", hireExpireTime: "Expired Time", operation: "Operate", noData: "No data", edit: "Edit", divicesInfo: "Device information", cellName: "Contacts",
    phone: "Tel/Mob", timezone: "Timezone", save: "Save", confirm: "Confirm", updateUserSuccess: "Edit successfully!", updateUserFailed: "Edit failure!", modelName: "Type", state: "Status",
    drection: "Direction", baidu: "Baidu", google: "Google", day: "Day", hour: "Hour", minute: "Minute", stopTime: "Stop time", desc: "Remark", cancel: "Cancel", del: "Delete", delSuccess: "Delete successfully!",
    delFaild: "Delete failure!", accStr: "ACC status", acc0: "Off", acc1: "On", positionType: "Position Type", manDevice: "Device management", type: "Type", acc2: "Unconnected", clear: "Clear", positionTime: "last update",
    targetName: "Target Name", primaryEmail: "Email", resolve: "Resolve", startStopTime: "Start", endStopTime: "End", status1: "Logged Off", moving: "Moving", stopCar: "Stop", offline: "Offline", arrears: "overdue",
    toExcel: "To Excel", distance2: "Mileage", km: "km", m: "M", event: "Event recording", inTime: "Enter time", outTime: "Departure time", moneyCount: "Point",
    deviceHireDay: "the points to charge", belongTo: "user", updateTime: "update time",
    sendDeviceMsg: "issue the command to the device", sendMsg: "issue the command", sendMsgText: "command content",
    ShowStopIcon: "Whether to show parking lots"
};

var courseName = { dueNorth: "North", northeast: " Northeast ", dueEast: "East", southeast: " Southeast", dueSouth: "South", southwest: "Southwest", dueWest: "West", northwest: "Northwest " };

var reportPage = { title: "Total Moving Statistics", warnCount: "Alarm", stopCount: "Stay" };

var alarmSumPage = { title: "Total Alarm Statistics", lowCount: "Low Battery alarm", cutPowerCount: "Cut-off alarm", vibCount: "Vibration alarm", sosCount: "SOS alarm" }

var overSpeedPage = { continueTime: "Continue Time", speedlimit: "Speed Limit", distancePage: "Mileage Report", overspeedDetail: "Overspeed Details", stopDetail: "Stop Details" };

var alarmIndexPage = { geofenceIn: "Geo-fence In", geofenceOut: "Geo-fence Out", moved: "Displacement", lowBattery: "Low battery Alarm", sos: "SOS Alarm", cutPower: "Cut-off Alarm", vibration: "Vibration Alarm",
    overSpeed: "OverSpeed", offline: "Offline"
};


var runindexPage = { statistics: "Query By", statistics2: "Daily Details", oilCoefficient: "Fuel Consumption Coefficient/100 Kilometers", L: "L", oil: "Fuel Consumption" };



var alarmDetailPage = { alarmTime: "Alarm Time", alarmType: "Alarm Type", alarmCount: "Alarm Statistics", alarmDetail: "Alarm Details" };

var userPage = { warnTitle: "Alarm Overview", warnSound: "Alarm sound on", day7Exp: "7Days Expired", day60Exp: "60Days Expired", alreadyExp: "Expired",
    username: "Name/Account", hello: "Hello", searchDevice: "Target", searchUser: "Customer", exit: "Exit", message: "Message", allDeivce: "All Target", moneyMove: "points for sale", moneyHistory: "points consumer records"
};

var userInfoPage = { myAccount: "My account", changePassword: "Change Password ", userMsg: " Tip: Complete information such as telephone number, contact.", customerName: " Customer Name ",
    account: "Login Account", oldPass: "Existed password", newPass: "New password", confirmPass: "Password Confirmation", passLengthMsg: " Password must be less than 20 digits ", passNull: "Password input cannot be blank!",
    passError: "The two passwords input are different!", changePassSuccess: "Password reset successfully!", changePassError: "Password reset failure!", oldPassError: "Old password error!",
    warnSendMsg: "Additional Alarm Inform Mode", sendEmail: "Email", service: "My Service"
};

var warnMessagePage = { warnMsg: "Alarm message", handle1: "Undealed ", handle2: " handled ", alarmType: "Alarm Type", alarmTime: "Alarm Time" };

var trackingPage = { secondMsg: "Refresh after seconds!" };

var playbackPage = { from: "From", to: "To", play: "Play", pause: "Pause", next: "Continue", fast: "Fast", slow: "Slow", timeMsg: "End Time should be later than Start Time!", nowLoading: "Loading data!",
    playOver: "Finish!", searchNull: "No data!", showLBS: "Show LBS"
};

var geofencesPage = { geofence: " Geo-fence ", addGeofence: "Add", geoNameNull: "Geo-fence name cannot be blank!", radius: "R(m)", delGeoConfirm: "Confirm to delete", delGeoConfirm2: "Is this Geo-fence?",
    addSuccess: "Add Success!", addFaild: "Add Failed!", timeOut: "Timeout, Try again later"
};

var iframeMapPage = { baiduMap: "Baidu Map", googleMap: "Google Map", deviceName: "Target name" };

var userUpdatePage = { account: "Account" };

//map.aspx
var mapPage = { divicesInfo: "Target Info", cutOffPetrol: "Cut off Petrol", restorePetrol: "Restore Petrol ", checkLocation: " Check Location ", checkCommand: " Check Command ", downloadLocation: "Tracking Report", obd: "OBD诊断" };

var downloadLocation = { download: "Download", help: "Help", step: "Steps", step1: "1.Select the Targets.", step2: "2.Enter date.", step3: "3.Click 'Download'.",
    msg1: "Note：If you get a 'No Data!' That means there is no valid data for your tracker in this certain period.", msg2: "Tracking download format is Google KML, e.g.:'file name.kml'. ",
    msg3: "Double click KML file to open it after installing Google Earth", msg4: "KML Track File will display the track with dynamical red line on google maps .", msg5: "Tips:Download Google Earth Click", here: "here",
    msg6: "You can download the track file for a certain period through the function 'download Track file'。Type of track file 'KML Track File' AND 'KML Anchor File'"
};

var cusPage = { updateExpTime: "renew the maturity time", updateError: "fail to change!" };

var moneyPage = { moveToAccount: "the login account to transfer into", moveToUser: "the username to transfer into", moveCount: "the points to transfer into", check: "detect", noLoginName: "this name does not exist!", inputLoginNameIn: "please test the login name!",
    inputLoginNameOut: "please test the login name!", noMoveSelf: "can not transfer to oneself!", moneyLack: "the point is not enough!", moneyError: "fail to transfer!", moveSuccess: "transfer the points successfully, the current points is:", inputMoneyMsg: "please input the points!",
    uToUser: "for the user", money: "point", user: "user", moveMoneyMsg1: "the points been transferred ", give: "for", moneyMsg2: "charge for the device, the total points used", day: "day", msg1: "1 point for 30 day", oneYeah: "one year", twoYeah: "two years",
    lifelong: "lifelong", msg2: "Extend the maturity time", msg3: "the device is charged successfully!", msg4: "the points is not enough, please charge!!", msg5: "days must be greater then 0!",


    TransferLack: "Add more!", moveTransferSuccess: "Done! Current times:", inputTransferMsg: "Times of transfer !", lifeLong: "lifelong",
    //点卡更新
    remainingPoints: "Balance", remainingTransferLifelong: "Remaining times", transferLifelong: "Lifelong transfer",
    transferPassword: "Password transfer", modifyTransferPassword: "Change password", transferViews: "Transferring times", bout: "Times",
    moneyMsg12: "Equipments top up to lifelong "
};


//acc 语言包 2013-05-20
var acc = { accLeftTitle: "Ignition Statistics", accBeginTime: "ACC ON", accEndTime: "ACC OFF", accDuration: "Duration", accTableTitle: "Working Time(ACC ON)"

};