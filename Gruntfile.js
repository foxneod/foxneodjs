/*global module, console */

(function(){
    'use strict';

    module.exports = function (grunt) {
        var packageJSON = grunt.file.readJSON('package.json');
        var timestamp = function () {
            return new Date().getTime();
        };

        var _tokenReplacements = [
            {
                from: '@@packageName',
                to: packageJSON.name
            },
            {
                from: '@@version',
                to: packageJSON.version
            },
            {
                from: '@@ovpVersion',
                to: packageJSON.ovpVersion
            },
            {
                from: '@@ovpAssetsFilePath',
                to: packageJSON.ovpAssetsFilePath
            },
            {
                from: '@@buildDate',
                to: function () {
                    var buildDate = grunt.template.date(timestamp(), "yyyy-mm-dd hh:mm:ss");

                    return buildDate;
                }
            },
            {
                from: '@@timestamp',
                to: timestamp()
            },
            {
                from: '@@debugMode',
                to: packageJSON.debugMode
            },
            {
                from: '@@debugMessagePrefix',
                to: '<%= pkg.name %>-<%= pkg.version %>: '
            },
            {
                from: '@@authors',
                to: function () {
                    return packageJSON.authors.join(',');
                }
            }
        ];




        grunt.initConfig({
            pkg: packageJSON,

            jshint: {
                options: {
                    jshintrc: '.jshintrc'
                },
                files: ['gruntfile.js', 'js/**/*.js']
            },

            requirejs: {
                compile: {
                    options: {
                        baseUrl: "js",
                        name: 'main',
                        out: "build/<%= pkg.name %>-<%= pkg.version %>.js",

                        //Introduced in 2.1.2 and considered experimental.
                        //If the minifier specified in the "optimize" option supports generating
                        //source maps for the minfied code, then generate them. The source maps
                        //generated only translate minified JS to non-minified JS, it does not do
                        //anything magical for translating minfied JS to transpiled source code.
                        //Currently only optimize: "uglify2" is supported when running in node or
                        //rhino, and if running in rhino, "closure" with a closure compiler jar
                        //build after r1592 (20111114 release).
                        //The source files will show up in a browser developer tool that supports
                        //source maps as ".js.src" files.
                        generateSourceMaps: false,

                        //How to optimize all the JS files in the build output directory.
                        //Right now only the following values
                        //are supported:
                        //- "uglify": (default) uses UglifyJS to minify the code.
                        //- "uglify2": in version 2.1.2+. Uses UglifyJS2.
                        //- "closure": uses Google's Closure Compiler in simple optimization
                        //mode to minify the code. Only available if running the optimizer using
                        //Java.
                        //- "closure.keepLines": Same as closure option, but keeps line returns
                        //in the minified files.
                        //- "none": no minification will be done.
                        optimize: "none",

                        //Wrap any build layer in a start and end text specified by wrap.
                        //Use this to encapsulate the module code so that define/require are
                        //not globals. The end text can expose some globals from your file,
                        //making it easy to create stand-alone libraries that do not mandate
                        //the end user use requirejs.
//                        wrap: {
//                            start: '(function (window, undefined) {',
//                            end: "\twindow.FoxNEO = window.$f = FoxNEO;\n" +
//                                "}(window, undefined));"
//                        },

                        //Another way to use wrap, but uses default wrapping of:
                        //(function() { + content + }());
                        wrap: true,

                        //Allows namespacing requirejs, require and define calls to a new name.
                        //This allows stronger assurances of getting a module space that will
                        //not interfere with others using a define/require AMD-based module
                        //system. The example below will rename define() calls to FoxNEO.define().
                        //See http://requirejs.org/docs/faq-advanced.html#rename for a more
                        //complete example.
//                        namespace: 'FoxNEO',

                        // uses prefixed commas - makes for easy commenting-out (cmd + /)
                        paths: {
                            almond: '../bower_components/almond/almond',
                            lodash: '../bower_components/lodash/dist/lodash.compat.min',
                            jquery: '../bower_components/jquery/jquery.min',
                            omnitureloader: 'lib/omniture/omnitureloader',
                            JSON: '../bower_components/JSON-js/json2'
                        },

                        //Finds require() dependencies inside a require() or define call. By default
                        //this value is false, because those resources should be considered dynamic/runtime
                        //calls. However, for some optimization scenarios, it is desirable to
                        //include them in the build.
                        //Introduced in 1.0.3. Previous versions incorrectly found the nested calls
                        //by default.
                        findNestedDependencies: true,

                        shim: {
                            jquery: {
                                exports: '$'
                            },
                            lodash: {
                                exports: '_'
                            }
                        },

                        //Defines the loading time for modules. Depending on the complexity of the
                        //dependencies and the size of the involved libraries, increasing the wait
                        //interval may be required. Default is 7 seconds. Setting the value to 0
                        //disables the waiting interval.
                        waitSeconds: 7
                    }
                }
            },

            replace: {
                "in foxneod library": { //can be any name, might as well make it descriptive
                    src: 'build/<%= pkg.name %>-<%= pkg.version %>.js',
                    dest: 'build/<%= pkg.name %>-<%= pkg.version %>.js',
                    replacements: _tokenReplacements
                },
                "for versionless file": { //can be any name, might as well make it descriptive
                    src: 'build/<%= pkg.name %>-<%= pkg.version %>.js',
                    dest: 'build/<%= pkg.name %>.js',
                    replacements: _tokenReplacements
                }
            },

            uglify: {
                options: {
                    banner: "/*!\n" +
                        "* Project: <%= pkg.name %> <%= pkg.version %>\n" +
                        "* Last Modified: <%= grunt.template.today('dddd, mmmm dS, yyyy, h:MM:ss TT') %>\n" +
                        "* Author(s): <%= pkg.authors %>\n" +
                        "*/\n\n",
                    compress: true
//                    mangle: true
                },
                minification: {
                    files: {
                        'build/<%= pkg.name %>-<%= pkg.version %>.min.js': ['build/<%= pkg.name %>-<%= pkg.version %>.js'],
                        'build/<%= pkg.name %>.min.js': ['build/<%= pkg.name %>-<%= pkg.version %>.js']
                    }
                }
            },

            shell : {
                phpbuild: {
                    command: "cd ../legacy-svn-trunk/trunk/ && node build qa fx btn fox deportes wigs"
                }
            },

            watch: {
                files: ['<%= jshint.files %>'],
                tasks: ['dev']
            }
        });

        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-requirejs');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-text-replace');
        grunt.loadNpmTasks('grunt-shell');


        grunt.registerTask('default', ['jshint', 'requirejs', 'replace', 'uglify', 'shell:phpbuild']);
        grunt.registerTask('dev', ['jshint', 'requirejs', 'replace', 'shell:phpbuild']);
        grunt.registerTask('prod', ['jshint', 'requirejs', 'replace', 'uglify', 'shell:phpbuild']);
    };
})();