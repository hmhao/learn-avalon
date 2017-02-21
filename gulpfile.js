var package = require('./package.json'),
    gulp = require('gulp'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect');

gulp.task('clean', function() {
    return gulp.src('./demo/vendor/*', { read: false })
        .pipe(clean());
});

var vendors = {
    'jquery': {
        'src':'./node_modules/jquery/dist/jquery.js',
        'destdir': 'jquery'
    },
    'requirejs': {
        'src': './node_modules/requirejs/require.js',
        'destdir': 'require'
    },
    'requirejs-domready': {
        'src': './node_modules/requirejs-domready/domReady.js',
        'destdir': 'require'
    },
    'requirejs-text': {
        'src': './node_modules/requirejs-text/text.js',
        'destdir': 'require'
    },
    'require-css': {
        'src': './node_modules/require-css/css.js',
        'destdir': 'require'
    },
    'avalon':{
        'src': './node_modules/avalon/avalon.js',
        'destdir': 'avalon'
    }
};

gulp.task('vendor', ['clean'], function() {
    var option;
    for(var module in vendors){
        if(typeof vendors[module] === 'string'){
            option = {
                src: vendors[module]
            }
        }else{
            option = vendors[module];
        }
        option.dest = './demo/vendor/' + (option.destdir || '');
        if(option.src){
            gulp.src(option.src)
                .pipe(gulp.dest(option.dest));
        }
    }
});

gulp.task('server', function() {
    connect.server();
});