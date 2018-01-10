const gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat');

gulp.task('pug', function buildHTML() {
  return gulp.src('src/pug/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('public'));
});

gulp.task('sass', function () {
    return gulp.src('src/sass/main.sass')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%'], {cascade: true}))
        .pipe(concat('index.css'))
        .pipe(gulp.dest('src/css'));
});

gulp.task('watch', ['sass', 'pug'], function () {
    gulp.watch(['src/sass/**/*.sass'], ['sass']);
    gulp.watch(['src/pug/**/*.pug'], ['pug']);
});

gulp.task('default', ['watch']);