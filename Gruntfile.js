module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    express: {
      dev: {
        options: {
          script: 'app/server/index.js'
        }
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'app/**/*.js',
        '!app/client/lib/**',
        '!app/server/lib/**',
        'db/**'
      ],
      options: {
        globals: {
          eqeqeq: true
        }
      }
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
      server: {
        files: [
          'app/**',
          'db/**',
        ],
        tasks: [
          'jshint',
          'test',
          'express:dev'
        ],
        options: {
          spawn: false
        }
      },
      test: {
        files: [
          'test/**'
        ],
        tasks: [
          'test'
        ]
      }
    },
  });

  grunt.registerTask('test', [
    'mochaTest'
  ]);
};
