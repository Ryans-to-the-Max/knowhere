module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'node_modules/angular/angular.js',
      // 'app/client/lib/angular/angular.min.js',
      'node_modules/angular-bootstrap-npm/dist/angular-bootstrap.js',
      'node_modules/angular-route/angular-route.js',
      // // 'app/client/lib/angular-route/angular-route.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/client/app/**/*.js',
      'spec/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: [
      'jasmine',
      // 'requirejs',
    ],

    browsers : ['Chrome'],

    plugins : [
      'karma-chrome-launcher',
      'karma-jasmine',
      // 'karma-requirejs',
    ],

    // junitReporter : {
    //   outputFile: 'test_out/unit.xml',
    //   suite: 'unit'
    // },

  });
};
