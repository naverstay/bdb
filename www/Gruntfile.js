module.exports = function (grunt) {

    grunt.initConfig({
        watch: {
            templates: {
                files: ['jade/*.jade', 'jade/*.pug'],
                tasks: ['newer:pug'],
                options: {
                    spawn: false
                }
            },
            styles: {
                files: ['sass/*.scss'],
                tasks: ['wellington'],
                options: {
                    spawn: false
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'js/jquery1.10.js',
                    'js/jquery.plugin.js',
                    'js/jquery.countdown.js',
                    'js/jquery.countdown-ru.js',
                    'js/skrollr.js',
                    'js/jquery-ui-1.11.4.js',
                    'js/jquery.ba-throttle-debounce.min.js',
                    'js/jquery.sticky-kit.min.js',
                    'js/jquery.touchSwipe.min.js',
                    'js/jquery.carouFredSel-6.0.4-packed.js',
                    'js/isotop/isotope.pkgd.js',
                    'js/isotop/packery-mode.pkgd.js',
                    //'js/lazyload.js',
                    'js/script.js'
                ],
                dest: 'js/script.min.js'
            }
        },
        uglify: {
            all: {
                options: {
                    compress: {
                        drop_console: false
                    },
                    sourceMap: false,
                    mangle: false
                },
                files: {
                    'js/script.min.js': [
                        'js/jquery1.10.js',
                        'js/jquery.plugin.js',
                        'js/jquery.countdown.js',
                        'js/jquery.countdown-ru.js',
                        'js/skrollr.js',
                        'js/jquery-ui-1.11.4.js',
                        'js/jquery.ba-throttle-debounce.min.js',
                        'js/jquery.sticky-kit.min.js',
                        'js/jquery.touchSwipe.min.js',
                        'js/jquery.carouFredSel-6.0.4-packed.js',
                        'js/isotop/isotope.pkgd.js',
                        'js/isotop/packery-mode.pkgd.js',
                        //'js/lazyload.js',
                        'js/script.js'
                    ],
                    'js/blog.min.js': [
                        'js/jquery.mosaic.min.js',
                        'js/jquery.fancybox.min.js',
                        'js/blog.js'
                    ],
                    'js/contacts.min.js': [
                        'js/contacts.js'
                    ]
                }
            }
        },
        wellington: {
            styles: {
                src: [
                    'sass/main_global.scss'
                    //'sass/**/*.scss'
                ],
                options: {
                    //debug: true,
                    p: 'sass',
                    b: 'styles',
                    s: 'compressed',
                    d: 'i/src',
                    gen: 'i/dist',
                    font: 'fonts'
                }
            }
        },
        sass: {
            dist: {
                options: {
                    sourcemap: 'none',
                    style: 'compressed'
                },
                files: {
                    'styles/styles.css': 'sass/styles.scss',
                    'styles/main_global.css': 'sass/main_global.scss'
                }
            }
        },
        pug: {
            //debug: {
            //    options: {
            //        data: {
            //            client: false,
            //            debug: true,
            //            pretty: true
            //        }
            //    },
            //    files: [{
            //        cwd: "jade/",
            //        src: "*.jade",
            //        dest: "",
            //        expand: true,
            //        ext: ".html"
            //    }]
            //},
            release: {
                options: {
                    data: {
                        client: true,
                        debug: false,
                        pretty: false,
                        time: (new Date()).getTime()
                    }
                },
                files: [{
                    cwd: "jade/",
                    src: "*.jade",
                    dest: "",
                    expand: true,
                    ext: ".html"
                }]
            }
        },
        jade: {
            compile: {
                options: {
                    client: false,
                    pretty: true
                },
                files: [{
                    cwd: "jade/",
                    src: "*.jade",
                    dest: "",
                    expand: true,
                    ext: ".html"
                }]
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['watch']);
};
