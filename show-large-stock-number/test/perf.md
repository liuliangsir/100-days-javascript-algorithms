## Contains

```javascript

var microtime = require('microtime');

var start = microtime.now();

var replace = function (vol) {

    vol = Number(vol);

    let bigs = [1e3, 1e6, 1e9, 1e12];
    let unit = ['', 'K', 'M', 'B', 'T'][bigs.findIndex((v, k) => vol < v)];

    return vol.toPrecision(3).replace(/e.+$/, '') + unit;

}
var slice = function (vol) {

    vol = Number(vol);

    let bigs = [1e3, 1e6, 1e9, 1e12];
    let unit = ['', 'K', 'M', 'B', 'T'][bigs.findIndex((v, k) => vol < v)];

    return vol.toPrecision(3).slice(0, 4) + unit;

}
```


```javascript
console.log(end - start)
```

### replace

```javascript
replace(12345678);
var end = microtime.now();
```

### slice

```javascript
slice(12345678);
var end = microtime.now();
```

