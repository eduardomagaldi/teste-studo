/*jslint regexp:true*/
/*global console, require*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		"sass_src" : "dev/sass/",
		"sass_dest" : "dist/css",

		//basic task for serving files
		connect: {
			server: {
				options: {
					port: 8000,
					hostname: 'localhost',
					keepalive: true
				}
			}
		},
		//task that compiles sass into css
		sass: {
			dist: {
				"options" : {
					//"style": "compressed",
					//"trace":true,
					//"precision":8,
					//"loadPath" : "bower_components/",
					//"debugInfo" : true,
					//"stopOnError" : true,
					quiet: true //not to show sass deprecation warnings
				},
				files: [{
					"expand": true,
					"cwd": "<%=sass_src%>",
					"src": ["**/*.scss"],
					"dest": "<%=sass_dest%>",
					"ext": ".css"
				}]
			}
		},
		//task to watch for files changes and compile automatically
		watch: {
			css: {
				files: 'dev/sass/**/*.scss',
				tasks: ['sass']
			}
		},
		//task to be able to run all tasks simultaneously
		parallel: {
			assets: {
				options: {
					grunt: true,
					stream: true //log tasks responses in real time
				},
				tasks: ['watch', 'connect']
			}
		}
	});

	//grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-parallel');

	// Default task(s).
	grunt.registerTask('default', ['parallel:assets']);

};