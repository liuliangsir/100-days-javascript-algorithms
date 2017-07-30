define(function () {

    'use strict';

    var parseUrlByIndexOf = function (url, key) {

        url = url || document.location.href || location.href;

        var start = url.indexOf('?');
        var queryData = decodeURIComponent(url.slice(start + 1));
        var hasKey = arguments.length > 1;

        key = hasKey ? key + '' : '';

        if (start < 0 || !queryData) {
            return key ? '' : {};
        }

        key = key.replace(/\s/g, ' ');

        var legalKey = key ? key.replace(/[\-\[\]\{\}\(\)\*\+\?\.\,\\\^\$\|\#\s]/g, '\\$&') : key;
        var isGlobalSearch = !legalKey;

        var regexp = isGlobalSearch
            ? new RegExp('[^&]+?=?([^&]+)(?=&)?', 'gi')
            : new RegExp('(^|&)' + legalKey + '=([^&]+)(?=&)?', 'i');

        var result = queryData.match(regexp);

        if (!result) {
            return key ? '' : {};
        }

        if (result.input) {
            return result[2];
        }

        return result.reduce(function (pre, cur) {
            var parts = cur.split('=');
            pre[parts[0]] = parts[1] || '';
            return pre;
        }, {});
    };

    return {
        indexOf: parseUrlByIndexOf
    }
});
