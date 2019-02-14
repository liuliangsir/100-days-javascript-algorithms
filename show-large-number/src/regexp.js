function addCommas(num) {
    return String(num).replace(/\d(?=(\d{3})+(\.\d+)?$)/g, '$&,');
}

module.exports = addCommas;
