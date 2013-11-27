function writePage(msg) {
    document.write(msg);
}

var allPage = { deviceNo: "IMEI Number", search: "Search", tracking: "Tracking", playback: " Playback ", monitor: " Monitor", home: " Home ", customer: " Business ", message: " Message ", exit: " Exit ",
    selSizeStr: "Check", sizeStr: "records", createTime: " Create Time", operation: " Operate", no: "NO.", cellName: "Contacts", phone: "Tel/Mob", device: "Target", purchase: "Purchase ", stock: "Stock",
    mobileWebsite: "Access by mobile", deviceName: "Target Name", simNo: "SIM Card NO.", expireTime: "Due to", remark: " Remark ", cancel: "Cancel ", deviceInfo: "Device Information", imeiNo: "IMEI Number ",
    dataError: "Data Error!", softFailed: "Error!", password: " Password ", confirm: "Save", num: "NO.", noData: "No Data!", acc0: "Off", acc1: "On",
    acc2: "Unconnected", searchNull: "IMEI/Name/Car NO./Name/Account is required!", initPass: "Reset Pwd", updateTime: "Update Time ", loginAccount: "Login Account", passLengthMsg: " Password must be less than 20 digits ", type: "Type", userType1: "End User",
    userType2: "Distributor ", address: "Address", add: "New", information: "Information", deviceType: "Type", overspeed: "Overspeed", kmHour: "Km/h", devicePhone: "SIM Card NO.", modelName: "Type",
    createTime: "Create Time", activeTime: "Activation Time", hireExpireTime: "Expired Time", edit: " Edit", more: " More ", deletes: "Delete", cusName: "Customer name", userInfo: " Customer Information ", plsSelUser: "Please select a user!",
    km: "Kilometer", plsSel: "Select", all: "All", online: "Online ", offline: "Offline ", carNum: "License Plate No.", speedLimit: " Speed Limit ", lat: "Latitude", lng: "Longitude", speed: "Speed ", drection: "Direction",
    allDistance: "Total mileage", state: "Status", positionTime: "last update", status1: "Logged Off", moving: "Moving", stopCar: "Stop", accStr: "ACC status", edit2: "Edit", type2: "Roles",
    deliveryTime: " Activation Time ", cellPhone: "Tel/Mob", save: "Save", clear: "Clear", arrears: "overdue", view: "View", deviceHireDay: "the points to charge", sendDeviceMsg: "issue the command to the device", sendMsg: "issue the command", sendMsgText: "command content",
    obd: "OBD诊断"
};

//login.aspx
var loginPage = { title: "GPS tracking station", accountTab: "Account ", imeiTab: "IMEI No.", account: "Account", password: "Password ", loginSubmit: "Go", languageMsg: " We offered in ", loginMsg: "Please check your account and password!",
    loginMsg2: "Please check the IMEI No./Car No./ Password!", loginMsg3: "Input cannot be blank!"
};


//Dealer.aspx
var dealerPage = { warnTitle: "Alarm Remind", warnSound: "Alarm sound on", username: "Customer Name/Account", hello: "Hello", changePassword: " Change Password", searchDevice: "Target", searchUser: "Customer",
    searchDevice2: "TargetCheck", searchUser2: "CustomerCheck", name: "Name of Customer", belongTo: "Membership", sim: "SIM Card NO.", activeTime: "Activation date", customerName: "Customer name", nowSearch: "Searching...", name2: "Name of Customer",
    name3: "Target Name"
};

//Home.aspx
var homePage = { quickSearch: "Search", searchTxt: "IMEI NO./T/Car No.", stage: "Stage", deviceCount: "Target Count", operations: "More", novice: " newbie", quickSale: " Quick Sale ",
    batchSale: " Batch Sale", customer: "Customer", sale: "Sale", customerList: " customer List ", addDevice: "Additional", add: "+new", imeiNullMsg: "Please select the target!", expireTimeNullMsg: "Please select the expired date!",
    saleSuccess: " Success!"
};

var warnMessagePage = { alarmType: "Alarm Type", alarmTime: "Alarm Time" };

var alarmIndexPage = { geofenceIn: "GEO-fence In ", geofenceOut: " GEO-fence Out ", moved: "Displacement", lowBattery: "Low battery Alarm", sos: "SOS Alarm", cutPower: "Cut-off Alarm", vibration: "Vibration Alarm",
    overSpeed: "OverSpeed", offline: "Offline"
};

//map.aspx
var mapPage = { searchInput: "Please input name/IMEI No.", divicesInfo: "Target Info", geofence: "Geo-fence", cutOffPetrol: "Cut off Petrol", restorePetrol: "Restore Petrol ", checkLocation: " Check Location ", checkCommand: " Check Command ",
    sendConfirm: "Please confirm the account before sending command", passNull: "Please input password!", passError: "Password Error!", sendMsg1: "Sending message, please wait…", sendSuccess: "Success! Please wait for response...",
    sendMsg2: "Command null", sendMsg3: "Target not exist ", sendMsg4: "Time out ! Please try again.", sendMsg5: "Send command successfully", responseSuccess: " Respond Successfully!", responseNull: " Response Null!",
    checkLocatoin: " Check Location ", checkCommandTitle: "Check Command", cmdType: "Command Type", cmdState: "Command Status", responseText: "Response Message", responseTime: " Response Time ", sendTime: "Send Time",
    dyd: "Cut off Petrol", hfyd: " Restore Petrol ", deviceResponse: "Device Response", sendSuccess2: "Command has been sent!", noSend: "Command has not been sent", deviceDetailList: " Device Detail List ", addGroup: "Add Group",
    defaultGroup: "Default", moveToGroup: "Group Move", delGroupConfirm: "Delete Confirmation?", downloadLocation: "Tracking Report", obd: "OBD诊断"
};

var courseName = { dueNorth: "North", northeast: "North-east", dueEast: "East", southeast: " South-east ", dueSouth: "South", southwest: " Southwest ", dueWest: "West", northwest: " North-west " };

//CustomersList.aspx
var cusPage = { delUserConfirm: "Confirm to delete", delUserConfirm2: "Is this user?", delUserMsg: "This account has devices. It cannot be deleted!", delUserMsg2: "This account has sub-account. It cannot be deleted! ", msgFailed: "Failed to delete!",
    updateUserSuccess: "Success!", updateUserFailed: "Failed!!", delDeviceConfirm2: "is this target?", addCus: "Add Customer", manCus: "Manage Customer", delCus: "Delete Customer", saleTo: "Customer Move ",
    beDevice: "Membership", updateExpTime: "Update Expired Time", deviceChange: "Move", cusInfo: "Customers information", toCus: "Target Customers", newAddChildrenCus: "Add Customers", parentCus: " Superior Customer ",
    confirmPass: "Password Confirmation ", allCus: "All Customers", addCusTitle: " Add Customer", loginToUser: "Monitor", childCus: "Sub-account", changeDevices: "Batch Move", updateExpDevices: "Batch update",
    addUserMsg: "Tip: Complete information such as telephone number,contact. ", plsParentCusMsg: "Please select the superior customer!", msg1: "Name, Account, Password cannot be blank!", passError: "The two passwords input are different, please input it again!",
    existAccount: "Account has been existed!", dataError: "Data Null!", dataNull: "Name, Account, Password cannot be blank!", imeisNull: "IMEI No. cannot be blank!", saveDevuceMsg1: "Input together:", saveDevuceMsg2: "Group of IMEI No.",
    saveDevuceMsg3: "Success!", saveDevuceMsg4: "Success:", saveDevuceMsg5: "Group", saveDevuceMsg6: "Failed:", saveDevuceMsg7: "Error!", updateExpSuccess: "Success!",
    updateError: "Edit failure!", changeDeviceSuccess: "Success!", changeDeviceError: "Target move failure!", confirmInitPassMsg1: "Are you sure to reset:", confirmInitPassMsg2: "password?:",
    initPassSuccess: "Password reset successfully!", initPassError: "Password reset failure!", confirmInitUserPassMsg1: "Confirm to reset account?:"
};


var productUpdatePage = { oilCoefficient: "Fuel/100km", updateIcon: "Icon", carNumMsg1: "Car NO. is too long!", sccuess: "Update Success!", faild: "Update Failed!", isExistMsg: "Car NO. has existed， pls try another!" };

var moneyPage = { day: "day", msg1: "1 point for 30 day", oneYeah: "one year", twoYeah: "two years", lifelong: "lifelong", msg2: "Extend the maturity time",
    msg3: "the device is charged successfully!", msg4: "the points is not enough, please charge!!", msg5: "days must be greater then 0!",
    msg6: "can not transfer to oneself!", pointGive: "points for sale", pointConsumptionLog: "points consumer records",
    loginNameNotExist: "this name does not exist", intoLoginID: "the login account to transfer into", intoUsername: "the username to transfer into",
    intoPoint: "the points to transfer into", detect: "detect", pleaseDetectLoginName: "please test the login name",
    pleaseInputIntoPoint: "please input the points", money: "Credit", lifeLong: "lifelong", prepaid: "Top up"
};


 
