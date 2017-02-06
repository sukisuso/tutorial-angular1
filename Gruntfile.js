module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        concat: {
            "build": {
                "src": ["public/js/app.js", "public/js/services/*",  "public/js/controllers/*"],
                "dest": "public/js/build.js"
            }
        }
    });

    // Load required modules
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Task definitions
    grunt.registerTask('default', ['concat']);
};