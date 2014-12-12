module.exports = function(grunt) {
	"use strict";

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner:
						'/*! Respond.js v<%= pkg.version %>: <%= pkg.description %>\n' +
						' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
						' * Licensed under <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
						' * <%= pkg.homepageShortened %>' +
						' */\n\n',
		uglify: {
			nonMinMatchMedia: {
				options: {
					banner: '<%= banner %>',
					mangle: false,
					compress: false,
					preserveComments: 'some',
					beautify: {
						beautify: true,
						indent_level: 2
					}
				},
				files: {
					// CHANGED do not include matchMedia polyfill
					// We instead include https://github.com/weblinc/media-match,
					// which actually polyfills matchMedia for IE8 and other browsers
					// that do not support media queries at all. The popular
					// polyfill by Paul Irish only polyfills matchMedia for browsers
					// that do support media queries, but not window#matchMedia.
					'dest/respond.src.js': ['src/respond.js']
				}
			},
			minMatchMedia: {
				options: {
					banner: '<%= banner %>'
				},
				files: {
					'dest/respond.min.js': ['src/matchmedia.polyfill.js', 'src/respond.js']
				}
			},
			nonMinMatchMediaListener: {
				options: {
					banner: '<%= banner %>',
					mangle: false,
					compress: false,
					preserveComments: 'some',
					beautify: {
						beautify: true,
						indent_level: 2
					}
				},
				files: {
					'dest/respond.matchmedia.addListener.src.js': ['src/matchmedia.polyfill.js', 'src/matchmedia.addListener.js', 'src/respond.js']
				}
			},
			minMatchMediaListener: {
				options: {
					banner: '<%= banner %>'
				},
				files: {
					'dest/respond.matchmedia.addListener.min.js': ['src/matchmedia.polyfill.js', 'src/matchmedia.addListener.js', 'src/respond.js']
				}
			}
		},
		jshint: {
			files: ['src/respond.js', 'src/matchmedia.polyfill.js'],
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: false,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				smarttabs: true,
				node: true,
				es5: true,
				strict: false
			},
			globals: {
				Image: true,
				window: true
			}
		}
	});

	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );

	// Default task.
	grunt.registerTask('default', ['jshint', 'uglify']);

};
