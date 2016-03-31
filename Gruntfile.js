module.exports = function(grunt) {
  
  // Project configuration. 
  grunt.initConfig({
    uglify: {
      options: {
        ASCIIOnly: true
      },
      concat: {
        files: [{
          src: ['imagepreloader.js', 'jquery.image-lazy.js'],
          dest: 'jquery.image-lazy.all.min.js'
        }]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
