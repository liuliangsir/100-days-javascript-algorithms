function addCommas(num) {

    num = String(num);

    var result = [];
    var length = num.length;
    var start = length % 3;
    var isMod = !start;

    if (!isMod) {

        result.push(num.slice(0, start));

    }
    
    for (var i = start; i < length;) {

        result.push(
            num.slice(
                i,
                i += 3
            )
        );
    }
    
    return result.join(',')
}
module.exports = addCommas;