'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var jeet = require('jeet');
var pngquant = require('pngquant');
var jpegtran = require('imagemin-jpegtran');
var webpack = require('webpack-stream');
var wp = require('webpack');

var theme = 'themes/overpass_doc/';

gulp.task('styles', function () {
  return gulp.src('themes/src/styles/main.styl')
    //stylus
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
      .pipe($.stylus({use: [jeet()]}))
      .pipe($.autoprefixer({browsers: ['last 1 version']}))
      .pipe($.minifyCss())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(theme + 'static/css'));
});

gulp.task('scripts', function() {
  var config = require('./webpack.config.js');
  config.devtool = "inline-source-map";

  return webpack(config)
    .pipe(gulp.dest(theme + 'static/js/'));
});

gulp.task('scripts-deploy', function() {
  var config = require('./webpack.config.js');
  config.plugins.push(
    new wp.optimize.UglifyJsPlugin({minimize:true})
  );

  return webpack(config)
    .pipe(gulp.dest(theme + 'static/js/'));
});

gulp.task('jshint', function () {
  return gulp.src('themes/src/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('html', gulp.series('styles', function () {
  var assets = $.useref.assets({searchPath: '{.tmp,themes/src}'});

  return gulp.src('themes/src/layouts/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.htmlclean()))
    .pipe(gulp.dest(theme + 'layouts'));
}));

gulp.task('partials', gulp.series('styles', function () {
  var assets = $.useref.assets({searchPath: '{.tmp,themes/src}'});

  return gulp.src('themes/src/layouts/**/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.htmlclean()))
    .pipe(gulp.dest(theme + 'layouts/'));
}));

gulp.task('clean', require('del').bind(null, [theme + 'layouts', theme + 'static/assets/css/*.css', theme + 'static/assets/*.js']));

gulp.task('watch', function () {
  // watch for changes
  gulp.watch([
    '*.html',
    theme + 'static/css/**/*.css',
    'scripts/**/*.js',
  ]).on('change', $.livereload.changed);

  gulp.watch('themes/src/styles/**/*.styl', gulp.parallel('styles'));
  gulp.watch('themes/src/scripts/**/*.js', gulp.parallel('scripts'));
  gulp.watch('themes/src/**/*.html', gulp.parallel('html'));
  gulp.watch('themes/src/**/*.html', gulp.parallel('partials'));
});

gulp.task('clearcache', function() {
  $.cache.clearAll();
});

gulp.task('build', gulp.series('jshint', 'html', 'partials', function () {
  return gulp.src(theme + '**/*').pipe($.size({title: 'build', gzip: true}));
}));

gulp.task('deploy', gulp.series(
  'clean', 
  'build', 
  'scripts-deploy', 
  $.shell.task('node_modules/.bin/hugo --theme=overpass_doc --baseUrl=//osmlab.github.io/learnoverpass/'),
));

gulp.task('default', gulp.series(
  gulp.series('clean', 'build'), 
  gulp.parallel(
    'scripts', 
    'watch',
    $.shell.task('node_modules/.bin/hugo server --watch --theme=overpass_doc --buildDrafts'),
  ),
));
