var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');
var watch = require('gulp-watch');

var paths = {
  html:['src/*.html'],
  css:['src/*.css'],
  scripts: ['src/*.js'],
  dist:'dist/'
};

gulp.task('minify',function() {
  return gulp.src(paths.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('minify-css',function(){
  return gulp.src(paths.css)
    .pipe(autoprefixer({
      browsers:['last 2 versions','ie >= 8']
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('uglify', function(cb){
  pump([
    gulp.src(paths.scripts),
    uglify(),
    gulp.dest(paths.dist)
  ],
  cb);
});


// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.html, ['minify']);
  gulp.watch(paths.css, ['minify-css']);
  gulp.watch(paths.scripts, ['uglify']);
});

gulp.task('default', [/*'watch',*/ 'minify',
  'minify-css', 'uglify']);
