module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: [
        'Gruntfile.js',
        'app/**/*.js',
        '!app/client/lib/**',
        '!app/server/lib/**',
        'test/**/*.js',
      ],
      options: {
        globals: {
          eqeqeq: true
        }
      }
    },
  });
};
