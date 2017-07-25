/**
 * @file chart 展示框
 * @author chris<huanghoujin@kavout.com>
 */

function parseUrlByIndexOf(url, key = '') {

    key = key || '';

    let start = url.indexOf('?');

    if (start < 0) {
        return '';
    }

    let queryData = url.slice(start + 1);
    let legalKey = key ? key.replace(/[\-\[\]\{\}\(\)\*\+\?\.\,\\\^\$\|\#\s]/g, '\\$&') : key;
    let isGlobalSearch = !legalKey;

    let regexp = isGlobalSearch
        ? new RegExp('[^&]+?=([^&]+)(?=&)?', 'gi')
        : new RegExp('(^|&)' + legalKey + '=([^&]+)(?=&)?', 'i');

    let result = queryData.match(regexp);

    if (!result) {
        return '';
    }
    else if (result.input) {
        return decodeURIComponent(result[2]);
    }

    const reduceCallback = function (pre, cur) {

        let parts = cur.split('=');

        pre[parts[0]] = decodeURIComponent(parts[1]);

        return pre;
    };

    const reduce = function (arr, cb, initValue = {}) {

        return arr.reduce(cb, initValue);

    };

    return reduce(result, reduceCallback);
}
module.exports = parseUrl;
