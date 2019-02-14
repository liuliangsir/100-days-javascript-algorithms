var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var forMethod = require('../src/for.js');
var regexpMethod = require('../src/regexp.js');
var testCase = 1234567;

// add tests
suite.add('RegExp', function () {
        regexpMethod(testCase);
    })
    .add('For', function () {
        forMethod(testCase);
    })
    // add listeners
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // run async
    .run({
        'async': true
    });
