## Contains

```javascript

function parseUrlByDom(url, key = '') {


    const createQueryData = url => {

        let a = document.createElement('a');

        a.href = url;

        url = a.search.slice(1);

        a = null;

        return url;
    };

    let flags = 'i';
    let regexpTemplate = `${key}=([^&]+)(?=&)?`;
    let isGlobalSearch = !key;

    if (isGlobalSearch) {
        flags += 'g';
        regexpTemplate = `[^&]+?${regexpTemplate}`;
    }

    let regexp = new RegExp(regexpTemplate, flags);
    let result = createQueryData(url).match(regexp);

    const reduceCallback = (pre, cur) => {

        let [k, v] = cur.split('=');

        pre[k] = decodeURIComponent(v);

        return pre;
    };
    const reduce = (arr, cb, initValue = {}) => {

        return arr.reduce(cb, initValue);

    }
    return isGlobalSearch ? reduce(result, reduceCallback) : decodeURIComponent(result[1]);
}

function parseUrlByIndexOf(url, key = '') {


    const createQueryData = url => url.slice(url.indexOf('?') + 1);

    let flags = 'i';
    let regexpTemplate = `${key}=([^&]+)(?=&)?`;
    let isGlobalSearch = !key;

    if (isGlobalSearch) {
        flags += 'g';
        regexpTemplate = `[^&]+?${regexpTemplate}`;
    }

    let regexp = new RegExp(regexpTemplate, flags);
    let result = createQueryData(url).match(regexp);

    const reduceCallback = (pre, cur) => {

        let [k, v] = cur.split('=');

        pre[k] = decodeURIComponent(v);

        return pre;
    };
    const reduce = (arr, cb, initValue = {}) => {

        return arr.reduce(cb, initValue);

    }
    return isGlobalSearch ? reduce(result, reduceCallback) : decodeURIComponent(result[1]);
}

```


```javascript

```

###parseUrl#dom

```javascript

parseUrlByDom('http://www.baidu.com/?user=aaa&age=18');

```

### parseUrl#indexOf

```javascript

parseUrlByIndexOf('http://www.baidu.com/?user=aaa&age=18');

```

