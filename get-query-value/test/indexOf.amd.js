define(function () {

    'use strict';

    var parseUrlByIndexOf = function (url, key) {

        url = url || document.location.href || location.href;

        var start = url.indexOf('?');
        var queryData = url.slice(start + 1);
        var isOnlyOneParam = arguments.length < 2;

        key = isOnlyOneParam ? '' : key + '';

        if (
            (isOnlyOneParam || (!isOnlyOneParam && key === ''))
            && (start < 0 || !queryData)
        ) {
            return {};
        }

        key = key.replace(/\s/g, '+');

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
            return decodeURIComponent(result[2].replace(/\+/g, ' '));
        }

        return result.reduce(function (pre, cur) {
            var parts = cur.split('=').map(function (v) {
                return v.replace(/\+/g, ' ');
            });
            pre[parts[0]] = decodeURIComponent(parts[1] || '');
            return pre;
        }, {});
    };

    return {
        indexOf: parseUrlByIndexOf
    }
});
