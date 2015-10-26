module.exports = function(grunt) {
 grunt.initConfig({
   pkg: grunt.file.readJSON('package.json'),

   sass: {
     options: {
       includePaths: ['bower_components/foundation/scss']
     },
     dist: {
       options: {
         outputStyle: 'compressed',
         sourceMap: true,
       },
       files: {
         'public/css/app.css': 'public/scss/app.scss'
       }
     }
   },
   
   autoprefixer:{
      dist:{
        files:{
          'public/css/app.css':'public/css/app.css'
        }
      }
    },
    
   webpack: {
     build: {
       entry: './public/js/app.js',
       output: {
         path: "./public/js/",
         filename: "app-bundle.js",
       },
     }
   },

   watch: {
     grunt: {
       options: {
         reload: true
       },
       files: ['Gruntfile.js']
     },

     css: {
       files: 'public/scss/**/*.scss',
       tasks: ['sass', 'autoprefixer']
     },
     
     webpack: {
       files: ['public/js/**/*.js', 'public/js/**/*.ejs', '!public/js/app-bundle.js'],
       tasks: ['webpack']
     }
   }
 });

 grunt.loadNpmTasks('grunt-sass');
 grunt.loadNpmTasks('grunt-contrib-watch');
 grunt.loadNpmTasks('grunt-webpack');
 grunt.loadNpmTasks('grunt-autoprefixer');
 
 grunt.registerTask('build', ['sass', 'autoprefixer', 'webpack']);
 grunt.registerTask('default', ['build','watch']);
};