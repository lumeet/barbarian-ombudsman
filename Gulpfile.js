var gulp     = require('gulp');
var jshint   = require('gulp-jshint');
var jscs     = require('gulp-jscs');
var mocha    = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

var jsPaths = ['./lib/**/*.js', './test/**/*.js', './bin/*.js', 'Gulpfile.js'];

function handleError(err) {
  console.log(err.toString());
}

gulp.task('jshint', function() {
  return gulp.src(jsPaths)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jscs', function() {
  return gulp.src(jsPaths)
    .pipe(jscs());
});

gulp.task('mocha', function(callback) {
  gulp.src('./lib/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      return gulp.src('./test/**/*_test.js', { read: false })
        .pipe(mocha())
        .on('error', handleError)
        .pipe(istanbul.writeReports({
          reporters: ['lcovonly', 'text', 'text-summary']
        }))
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 40 } }))
        .on('error', handleError)
        .on('end', callback);
    });
});

gulp.task('test', ['jshint', 'jscs', 'mocha']);
