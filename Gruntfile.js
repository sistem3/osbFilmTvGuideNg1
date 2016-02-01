'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    html2js: {
      options: {
        module: 'osb-film-tv-guide-template'
      },
      main: {
        src: ['src/**/*.tpl.html'],
        dest: 'src/osbFilmTvGuide.directive.tpl.js'
      }
    },
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'src/css/osbFilmTvGuide.css': 'src/scss/osbFilmTvGuide.scss'
        }
      }
    },
    watch: {
      templates: {
        files: ['src/**/*.html'],
        tasks: ['html2js'],
        options: {
          spawn: false
        }
      },
      styles: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['serve']);
  grunt.registerTask('template', ['html2js']);
  grunt.registerTask('styles', ['sass']);
};