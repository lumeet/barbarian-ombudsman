var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var jscs   = require('gulp-jscs');
var mocha  = require('gulp-mocha');

var jsPaths = ['./lib/**/*.js', './test/**/*.js', './bin/*.js', 'Gulpfile.js'];

gulp.task('jshint', function() {
  return gulp.src(jsPaths)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jscs', function() {
  return gulp.src(jsPaths)
    .pipe(jscs());
});

gulp.task('mocha', function() {
  return gulp.src('test/**/*_test.js', { read: false })
    .pipe(mocha());
});

gulp.task('test', ['jshint', 'jscs', 'mocha']);
