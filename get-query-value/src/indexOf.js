/**
 * @file chart 展示框
 * @author chris<huanghoujin@kavout.com>
 */

var parseUrlByIndexOf = function (url, key) {

    key = key || '';

    var start = url.indexOf('?');

    if (start < 0) return '';

    var queryData = url.slice(start + 1);
    var legalKey = key ? key.replace(/[\-\[\]\{\}\(\)\*\+\?\.\,\\\^\$\|\#\s]/g, '\\$&') : key;
    var isGlobalSearch = !legalKey;

    var regexp = isGlobalSearch
        ? new RegExp('[^&]+?=([^&]+)(?=&)?', 'gi')
        : new RegExp('(^|&)' + legalKey + '=([^&]+)(?=&)?', 'i');

    var result = queryData.match(regexp);

    if (!result) {
        return '';
    }
    if (result.input) {
        return decodeURIComponent(result[2]);
    }
    return result.reduce(function (pre, cur) {
        var parts = cur.split('=');
        pre[parts[0]] = decodeURIComponent(parts[1]);
        return pre;
    }, {});
};


