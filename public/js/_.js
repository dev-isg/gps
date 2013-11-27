/*
* 通用脚本库
* 引入目的：解决内存泄漏问题，提升脚本执行性能。
*/
function _(id) {
    return document.getElementById(id);
}
_._ = function (searchClass, node, tag) {
    var result = [];
    if (document.getElementsByClassName) {
        var nodes = (node || document).getElementsByClassName(searchClass);
        for (var i = 0; node = nodes[i++]; ) {
            if (tag !== "*" && node.tagName === tag.toUpperCase()) {
                result.push(node);
            } else {
                result.push(node);
            }
        }

    } else {
        if (node == null)
            node = document;
        if (tag == null)
            tag = '*';
        var els = node.getElementsByTagName(tag);
        var elsLen = els.length;
        var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
        for (i = 0, j = 0; i < elsLen; i++) {
            if (pattern.test(els[i].className)) {
                result[j] = els[i];
                j++;
            }
        }
    }
    return result;
};
/*
* @description 判断是否是IE，如果是返回具体版本号
* @return IE的版本号，W3C系列返回undefined
* */
_.isIE = (function () {
    var undef, v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );
    return v > 4 ? v : undef;
} ());
_.isArray = function (o) {
    return Object.prototype.toString().call(o) === '[object Array]';
};
/*
* @description 批量设置样式表
* @param el HTML节点
* @param cssText style样式
* @param overWrite 是否重写现有节点style属性，默认为false
*/
_.css = function (el, cssText, overWrite) {
    if (el && el.style) {
        if (overWrite)
            el.style.cssText = cssText;
        else
            el.style.cssText += ';' + cssText;
    }
};
_.css.append = function (cssText) {
    var css = document.createElement('style'), head = document.head || document.getElementsByTagName("head")[0];
    css.setAttribute('type', 'text/css');
    //IE
    if (css.styleSheet) {
        css.styleSheet.cssText = cssText;
    } else {
        css.appendChild(document.createTextNode(cssText));
    }
    head.appendChild(css);
};
_.dom = function () { };
/**
* @description fix IE innerHTML memory leak,调用此方法来保证插入节点后再设置节点的innerHTML，避免在IE中的内存泄漏
*/
_.dom.append = function (parent, tagName) {
    var node = document.createElement(tagName);
    parent.appendChild(node);
    return node;
};
/*
* @description fix IE removeChild memory leak,采用ext的处理方式，也可以对删除的元素使用outerHTML=''，但是此方法不通用，某些元素的outerHTML属性只读
* @param n 要删除的HTML节点
*/
_.dom.remove = function (n) {
    var d;
    if (_.isIE) {
        if (n && n.tagName != 'BODY') {
            d = d || document.createElement('div');
            d.appendChild(n);
            d.innerHTML = '';
        }
    } else {
        if (n && n.parentNode && n.tagName != 'BODY') {
            n.parentNode.removeChild(n);
        }
    }
};
//为IE添加重用的动态script标签，标准浏览器无法重用script标签
(function () {
    if (_.isIE) {
        var script = document.createElement('script'), head = document.head || document.getElementsByTagName('head')[0], scriptId = 'ie_script_for_jsonp';
        script.id = scriptId;
        //表示此标签没有被占用
        script.setAttribute('using', '0');
        script.onreadystatechange = function () {
            if (this.readyState == "loaded" || this.readyState == "complete") {
                //请求完成后设置using属性为未被占用
                this.setAttribute('using', '0');
            }
        };
        //如果是IE此节点不能删除
        head.appendChild(script);
    }
})();
_.ajax = function () { };
/*
* @description fix IE jsonp memory leak，适合轮询JSONP请求调用
* @param url 需要手动加上callback参数，方法自动追加了时间戳
*/
_.ajax.jsonp = function (url) {
    var script, head = document.head || document.getElementsByTagName('head')[0], scriptId = 'ie_script_for_jsonp', waitTime = 200;
    if (_.isIE) {
        script = document.getElementById(scriptId);
        //标签正被其它请求占用，指定时间后继续发起请求
        if (script.getAttribute('using') === '1') {
            setTimeout(function () {
                _.ajax.jsonp(url);
            }, waitTime);
        } else {
            //当前请求占用此标签，请求完成后自动设置using属性为0
            script.setAttribute('using', '1');
            url += (url.indexOf('?') > -1 ? '&timestamp=' : '?timestamp=') + new Date().getTime();
            script.src = url;
        }
    } else {
        //标准浏览器removeChild没有明显的泄漏现象，可以直接删除
        script = document.createElement('script');
        head.appendChild(script);
        script.onload = function () {
            //使用this而不是script避免循环引用
            this.onload = null;
            this.parentNode.removeChild(this);
        };
        url += (url.indexOf('?') > -1 ? '&timestamp=' : '?timestamp=') + new Date().getTime();
        script.src = url;
    }
};
/*
* @description 获取远程脚本，只适合加载一次的脚本，轮询请使用_.ajax.jsonp。JSONP请求默认加上时间戳；普通AJAX不加时间戳
* @param callback JSONP加载脚本的回调函数
* */
_.ajax.getScript = function (url, callback) {
    var script, head = document.head || document.getElementsByTagName('head')[0], now = new Date().getTime();
    script = _.dom.append(head, 'script');
    if (callback) {
        if (url.indexOf("?") > -1) {
            url = "&callback=" + callback;
        } else {
            url = "?callback=" + callback;
        }
    }
    //如果是JSONP
    if (url.indexOf('callback=') > 0) {
        url += "&timestamp=" + now;
    }
    script.src = url;
};
/*
* @description 获取多个远程脚本文件，只适合加载一次。轮询请使用_.ajax.jsonp
* */
_.ajax.getScripts = function (urlArray) {
    if (_.isArray(urlArray)) {
        for (var index in urlArray) {
            _.ajax.getScript(urlArray[index]);
        }
    }
};