// Test configuration for kab
// Generated on Thu Jul 13 2017 18:52:28 GMT+0800 (CST)
module.exports = {
    node: true,
    // base path, that will be used to resolve files and exclude
    basePath: '../',
    // frameworks to use
    frameworks: ['jasmine', 'esl'],
    // list of files / patterns to load in the browser
    files: [
        'test/**/*Spec.js'
    ],
    // optionally, configure the reporter
    coverageReporter: {
        // text-summary | text | html | json | teamcity | cobertura | lcov
        // lcovonly | none | teamcity
        type: 'text|html',
        dir: 'test/coverage/',
        exclude: []
    },
    // web server port
    port: 8120,
    // enable / disable watching file and executing tests whenever any file changes
    watch: true,
    // Start these browsers, currently available:
    // - Chrome
    // - Firefox
    // - Opera
    // - Safari
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
        // 'Chrome',
        // 'Firefox',
        // 'Safari',
        'PhantomJS'
    ],
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,
    // Custom HTML templates
    // context | debug | runner
    templates: {
        // context: 'context.html'
    }
};
