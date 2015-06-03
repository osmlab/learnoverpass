'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var jeet = require('jeet');
var pngquant = require('pngquant');
var jpegtran = require('imagemin-jpegtran');
var theme = 'themes/overpass_doc/';

gulp.task('styles', function () {
  return gulp.src('themes/src/styles/main.styl')
    //stylus
    .pipe($.plumber())
    .pipe($.stylus({use: [jeet()]}))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.minifyCss())
    .pipe(gulp.dest(theme + 'static/css'));
});

gulp.task('jshint', function () {
  return gulp.src('themes/src/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('html', ['styles'], function () {
  var assets = $.useref.assets({searchPath: '{.tmp,themes/src}'});

  return gulp.src('themes/src/layouts/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.htmlclean()))
    .pipe(gulp.dest(theme + 'layouts'));
});

gulp.task('partials', ['styles'], function () {
  var assets = $.useref.assets({searchPath: '{.tmp,themes/src}'});

  return gulp.src('themes/src/layouts/**/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.htmlclean()))
    .pipe(gulp.dest(theme + 'layouts/'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')({
      paths: {
        bowerDirectory: 'themes/src/bower_components',
        bowerrc: 'themes/src/.bowerrc',
        bowerJson: 'themes/src/bower.json'
      }
    }).concat('fonts/**/*'))
      .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
      .pipe($.flatten())
      .pipe(gulp.dest('static/fonts'));
});

gulp.task('clean', require('del').bind(null, [theme + 'layouts', theme + 'static/assets/css/*.css', theme + 'static/assets/*.js']));

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('themes/src/styles/*.styl')
    .pipe(wiredep())
    .pipe(gulp.dest(theme + 'static/css'));

  gulp.src('themes/src/*.html')
    .pipe(wiredep())
    .pipe(gulp.dest(''));
});

gulp.task('watch', function () {
  // watch for changes
  gulp.watch([
    '*.html',
    theme + 'static/css/**/*.css',
    'scripts/**/*.js',
  ]).on('change', $.livereload.changed);

  gulp.watch('themes/src/styles/**/*.styl', ['styles']);
  gulp.watch('themes/src/**/*.html', ['html']);
  gulp.watch('themes/src/**/*.html', ['partials']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('clearcache', function() {
  $.cache.clearAll();
});

gulp.task('build', ['jshint', 'html', 'partials', 'fonts'], function () {
  return gulp.src(theme + '**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
  gulp.start('watch');
  gulp.src('').pipe($.shell(['hugo server --watch --theme=overpass_doc --buildDrafts']));
});
