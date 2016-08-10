var gulp = require('gulp');
gulp.task('copia', ['limpa'], function () {
    return gulp.src('./src/**/*')
		.pipe(gulp.dest('build'));
});

var del = require('del');
gulp.task('limpa', function () {
	return del('build');
});

var autoprefixer = require('gulp-autoprefixer');
gulp.task('prefixa', ['copia'],function () {
    return gulp.src('./build/css/*.css')
            .pipe(autoprefixer({
                browsers: [
                    'chrome >=42',
                    'firefox >= 29',
                    'ie >= 10'/*,
                    '> 1% in BR'*/]
                }))
            .pipe(gulp.dest('./build/css'));
});

var usemin = require('gulp-usemin');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('minifica', ['prefixa'], function () {
    return gulp.src('./build/*.html')
            .pipe(usemin({
                css: [minifycss()],
                js: [uglify()]
                }))
            .pipe(gulp.dest('./build/'));
});