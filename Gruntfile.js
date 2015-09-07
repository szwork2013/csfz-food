/**
 * Created by yuyangyang on 2015/6/30.
 */
module.exports = function (grunt) {


    grunt.initConfig({
        concat: {
            options: {
                separator: '\n'
            },
            dist: {
                src: [
                    'node_modules/react/dist/react.min.js',
                    'node_modules/react-router/umd/ReactRouter.min.js',
                    'node_modules/reflux/dist/reflux.min.js',
                    'node_modules/wolfy87-eventemitter/EventEmitter.min.js',

                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/moment/min/moment.min.js',
                    'node_modules/underscore/underscore-min.js',

                    'public/script/bootstrap.min.js',
                    'public/script/webuploader-0.1.5/webuploader.html5only.min.js'
                ],
                dest: 'public/build/lib/bundle.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

};