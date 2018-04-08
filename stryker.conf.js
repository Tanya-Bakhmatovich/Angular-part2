module.exports = function (config) {
    config.set({
        testRunner: 'karma',
        testFramework: 'jasmine',
        karmaConfigFile: 'karma.conf.js',
        reporter: ['progress', 'clear-text', 'dots', 'html', 'event-recorder'],
        coverageAnalysis: 'off',
        plugins: ['stryker-karma-runner', 'stryker-html-reporter', 'jasmine'],
        mutate: [
            'src/**/*.js',
        ]
    });
}
