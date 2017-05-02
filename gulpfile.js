var gulp            = require('gulp'),
    del             = require('del'),
    concat          = require('gulp-concat'),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    cssmin          = require('gulp-cssmin'),
    minify          = require('gulp-minify'),
    sassLint        = require('gulp-sass-lint'),
    rename          = require('gulp-rename'),
    browserSync     = require('browser-sync'),
    reload          = browserSync.reload;

var buildDestination = "dist";
var sourceLocation = "src";

gulp.task('clean', function () {
    return del([buildDestination]);
});

gulp.task('sass', function() {
    gulp.src(sourceLocation + '/styles/base.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(rename('styles/tradeforms.css'))
        .pipe(gulp.dest(buildDestination));

    gulp.src(sourceLocation + '/styles/mod-ui-components/base.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(rename('styles/mod-ui-components.css'))
        .pipe(gulp.dest(buildDestination));
});

gulp.task('scss-lint', function() {
    gulp.src(sourceLocation + '/scss/*.scss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task('serve', ['scss-lint', 'sass', 'watch'], function () {
    browserSync.init({
        server: {
            baseDir: buildDestination
        }
    });
});

gulp.task('watch', function () {
    gulp.watch(sourceLocation + '/styles/*.scss', ['sass', 'scss-lint', reload]);
    gulp.watch(sourceLocation + '/styles/**/*.scss', ['sass', 'scss-lint', reload]);
});

gulp.task('default', ['scss-lint', 'sass']);
