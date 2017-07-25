## Contains

```javascript

var firstFormatVol = function (vol) {

  var units = ['', 'K', 'M', 'B', 'T'];

  return vol.toPrecision(3).replace(/^(\d+)\.(\d+)e\+(\d+)$/, function ($0, integer, fractional, pow) {

    var mod = (pow % 3);

    var unit = units[(pow - mod) / 3];

    return unit ? (integer + fractional.slice(0, mod) + '.' + fractional.slice(mod) + unit) : $0;

  });

}
var secondFormatVol = function (vol) {

}
```


```javascript

```

### replace

```javascript
firstFormatVol(12345678);
```

### if

```javascript
secondFormatVol(12345678);
```

