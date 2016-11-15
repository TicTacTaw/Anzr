'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const browsersync = require('browser-sync');

const breload = (done) => {
    browsersync.reload();
    done();
};

gulp.task('sass', () => {
    return gulp.src('./src/sass/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(cleanCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', () => {
    gulp.watch('./src/sass/**/*.scss', gulp.series('sass', breload));
});

gulp.task('html:watch', () => {
    gulp.watch('./examples/*.html', gulp.series(breload));
});

gulp.task('fonts:copy', () => {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('browsersync', (cb) => {
    browsersync({
        server: {
            baseDir:'./'
        }
    }, cb);
});

gulp.task('watch', gulp.parallel('sass:watch', 'html:watch'));

gulp.task('default', gulp.series('sass', 'browsersync', 'watch'));