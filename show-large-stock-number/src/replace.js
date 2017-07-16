const formatStockData = function (vol) {

    vol = Number(vol);

    let bigs = [1e3, 1e6, 1e9, 1e12];
    let unit = ['', 'K', 'M', 'B', 'T'][bigs.findIndex((v, k) => vol < v)];

    return vol.toPrecision(3).replace(/e.+$/, '') + unit;

}

module.exports = formatStockData;