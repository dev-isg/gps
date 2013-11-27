
function RndNum(n) {
    var rnd = "";
    for (var i = 0; i < n; i++)
        rnd += Math.floor(Math.random() * 10);
    return rnd;
}

function padLeft(str, lenght) {
    if (str.length >= lenght) {
        return str;
    } else {
        return padLeft("0" + str, lenght);
    }
}


function IDEncryption(id) {
    id = parseInt(id);
    var sum = 0;
    var idStr = id + "";

    for (var i = 0; i < idStr.length; i++) {
        sum += parseInt(idStr.substring(i, i + 1));
    }
    var sumStr = RndNum(6) + sum;

    var idBackStr = "";
    for (var i = (idStr.length - 1); i >= 0; i--) {
        idBackStr += idStr.substring(i, i + 1) + "";
    }
    var startIndex = 0;
    for (var i = 0; i < idBackStr.length; i++) {
        if (idBackStr.substring(i, i + 1) == "0" || idBackStr.substring(i, i + 1) == 0) {
            startIndex++;
        } else {
            break;
        }
    }
    idBackStr = idBackStr.substring(startIndex);
    var allID = id + parseInt(idBackStr);
    var hex = allID.toString(16);
    var hexLengthStr = padLeft(hex.length, 2);

    var resStr = sumStr + "" + hex + hexLengthStr;
    return resStr;
}