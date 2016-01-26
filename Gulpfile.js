var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect');
 
gulp.task('serverConnect', function () {
  connect.server({
    root: './',
    port: 9000,
    livereload: true
  });
});

gulp.task('sass', function() {
    gulp.src('app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
    	.pipe(minifycss())
    	.pipe(gulp.dest('./css/'));
});

gulp.task('css', function() {
    gulp.src('app/css/**/*.css')
        .pipe(rename({suffix: '.min'}))
    	.pipe(minifycss())
    	.pipe(gulp.dest('./css/'));
});

gulp.task('scripts', function() {
  gulp.src('app/js/**/*.js')
        .pipe(rename({suffix: '.min'}))
    	.pipe(uglify())
    	.pipe(gulp.dest('./js/'));
});

gulp.task('html', function () {
  gulp.src('views/*.html')
    .pipe(connect.reload());
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(['views/*.html'], ['html']);
	gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/css/**/*.css', ['css']);
});

gulp.task('default', ['scripts', 'sass', 'css', 'serverConnect', 'watch'], function() {

});