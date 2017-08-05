## get url query value

```javascript

    var parseUrlByIndexOf = function (url, key) {

        url = url || document.location.href || location.href;

        var start = url.indexOf('?');
        var queryData = decodeURIComponent(url.slice(start + 1));
        var hasKey = arguments.length > 1;

        key = hasKey ? key + '' : '';

        if (start < 0 || !queryData) {
            return key ? '' : {};
        }

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

    var parseUrl = function(url, key = '') {

        key = key || '';

        var start = url.indexOf('?');

        if (start < 0) return '';

        var queryData = url.slice(start + 1);
        var legalKey = key ? key.replace(/[\-\[\]\{\}\(\)\*\+\?\.\,\\\^\$\|\#\s]/g, '\\$&') : key;
        var isGlobalSearch = !legalKey;
        var obj = !key ? {get [key]() {
            return this;
        }} : {};

        var regexp = isGlobalSearch
            ? new RegExp('[^&]+?=([^&]+)(?=&)?', 'gi')
            : new RegExp('(^|&)' + legalKey + '=([^&]+)(?=&)?', 'i');

        var result = queryData.match(regexp);

        if (!result) {
            return '';
        }

        return result.reduce((pre, cur) => {
            var parts = cur.split('=');
            pre[parts[0]] = decodeURIComponent(parts[1]);
            return pre;
        }, obj)[key];
    }


```

### after optimization

```javascript
    parseUrlByIndexOf('https://www.baidu.com/?user=someone&age=18');
```

### before optimization
```javascript
    parseUrl('https://www.baidu.com/?user=someone&age=18');
```