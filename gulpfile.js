/**
 * @author mlickei
 **/

var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var fontAwesome = require('node-font-awesome');
var clean = require('gulp-clean');

gulp.task('styles', function() {
    return gulp.src('./src/main/design/css/**/*.scss')
        .pipe(plumber())
        .pipe(less({
            outputStyle: 'expanded',
            includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'ie >= 9'],
            cascade: false
        }))
        .pipe(gulp.dest('./src/main/webapp/resources/css'));
});

gulp.task('fonts', function () {
    return gulp.src([
        'node_modules/font-awesome/fonts/*'
    ]).pipe(gulp.dest('./src/main/webapp/resources/fonts'));
});

gulp.task('other-resources', function () {
    return gulp.src(['./src/main/design/images/*']).pipe(gulp.dest('./src/main/webapp/resources/images'))
});

gulp.task('clean', function () {
    return gulp.src(['./src/main/webapp/resources/'], { read: false }).pipe(clean());
});

gulp.task('build', ['styles', 'fonts', 'other-resources']);

//Watch task
gulp.task('default',['clean'], function() {
    gulp.start('build');
});