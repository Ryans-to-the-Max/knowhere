module.exports = function(config){
  var configuration = {
    basePath : '../',

    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
    },

    files : [
      'node_modules/angular/angular.js',
      // 'app/client/lib/angular/angular.min.js',
      'node_modules/angular-bootstrap-npm/dist/angular-bootstrap.js',
      'node_modules/angular-ui-router/build/angular-ui-router.min.js',
      // 'node_modules/angular-route/angular-route.js',
      // // 'app/client/lib/angular-route/angular-route.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/client/app/**/*.js',
      'spec/unit/**/*.js',
    ],

    autoWatch : true,

    frameworks: [
      'jasmine',
      // 'requirejs',
    ],

    reporters: ['coverage'],

    preprocessors: {
      // Source files you want to generate coverage reports for
      // This should not include tests or libraries
      'app/client/app/**/*.js': 'coverage',
    },

    plugins : [
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-firefox-launcher',
      'karma-jasmine',
      // 'karma-requirejs',
    ],

    // junitReporter : {
    //   outputFile: 'test_out/unit.xml',
    //   suite: 'unit'
    // },
  };

  configuration.browsers = ( process.env.TRAVIS ? ['Firefox'] : ['Chrome', 'Firefox'] );

  config.set(configuration);
};
