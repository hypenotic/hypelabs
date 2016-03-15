module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'style.css': ['src/sass/main.scss']
                }
            }
        },

        uglify: {
            build: {
                options: {
                    mangle: false
                },
                files: {
                    'src/js/app.min.js': [
                    'src/components/jquery/dist/jquery.js', 
                    'src/components/anchor-js/anchor.js',
                    'src/components/scrollnav/jquery.scrollNav.js'
                    ]
                }
            }
        },

        jekyll: {
            options: {                          
                src: '.'
            },
            dist: {
                options: {
                    dest: './_site',
                    config: '_config.yml',
                    raw: 'baseurl: '
                }
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            sass: {
                files: ['src/sass/**/*.scss'],
                tasks: ['sass', 'jekyll'],
                options: {
                    spawn: false,
                }
            },

            js: {
                files: ['src/js/*.js'],
                tasks: ['jekyll'],
                options: {
                    spawn: false,
                }
            },

            html: {
                files: ['*.html', '_includes/*.html', '_layouts/*.html', '*/*.html','*.md'],
                tasks: ['jekyll'],
                options: {
                    spawn: false,
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 4000,
                    base: './_site'
                }
            }
        },
    });

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', ['uglify', 'sass', 'jekyll']);
    grunt.registerTask('js', ['uglify']);
    grunt.registerTask('server', ['connect', 'watch']);
};