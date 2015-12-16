module.exports = function (grunt) {
  // grunt.loadNpmTasks('grunt.contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');


  // in what order should the files be concatenated
  // var clientIncludeOrder = require('./include.conf.js');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    express: {
      dev: {
        options: {
          port: 5000,
          script: 'app/server/index.js'
        }
      },
    },

    // deletes all files in the listed dirs
    // clean: {
    //   dist: 'dist/*'
    // },

    jshint: {
      client: [
        'app/client/**/*.js',
        '!app/client/lib/**',
      ],
      database: 'db/**',
      gruntfile: 'Gruntfile.js',
      server: ['app/server/**/*.js'],

      options: {
        globals: {
          eqeqeq: true,
        },
      },
    },

    karma: {
      options: {
        configFile: 'spec/karma.conf.js',
        reporters: [
          'dots',
          // 'coverage'
        ],
      },
      watch: {
        background: true,
        reporters: ['progress'],
      },
      // Single-run config for dev
      single: {
        singleRun: true,
      },
      // Single-run config for CI
      ci: {
        singleRun: true,
        // coverageReporter: {
        //   type: 'lcov',
        //   dir: 'results/coverage/'
        // },
      },
    },

    mochaTest: {
      test: {
        options: {
          growl: true,
          clearRequireCache: true
        },
        src: [
          'test/integration/*.js',
          'test/unit/*.js'
        ]
      }
    },

    nodemon: {
      dev: {
        script: 'app/server/index.js'
      }
    },

    watch: {
      client: {
        files: ['app/client/**'],
        tasks: [
          'jshint:client',
          'karma:single',
        ],
        options: {
          atBegin: true,
        },
      },
      database: {
        files: ['db/**'],
        tasks: [
          'jshint:database',
          'mochaTest',
        ],
        options: {
          atBegin: true,
        },
      },
      server: {
        files: [
          'app/server/**',
        ],
        tasks: [
          'jshint:server',
          'mochaTest',
        ],
        options: {
          atBegin: true,
        },
      },

      startup: {
        files: ['app/server/**'],
        tasks: 'express:dev',
        options: {
          atBegin: true, // Run tasks at startup of the watcher to spin up server
          // spawn tasks in child process
          // set to false so server is spun up / restarted
          // see more info at: https://github.com/gruntjs/grunt-contrib-watch
          spawn: false,
        },
      },
    },

    // uglify: {
    //   client: {
    //     files: {
    //       'dist/app/client/scripts/knowhere.js': clientIncludeOrder
    //     }
    //   }
    // },
  });

  grunt.registerTask('testClient', ['karma:single']);

  grunt.registerTask('testServer', ['mochaTest']);

  grunt.registerTask('test', [
    'jshint',
    'testServer'
    //'testClient',
  ]);
};
