var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;



//path 路徑
var web = {
    html: [
        '*.html',
        '**/*.html'
    ],
    sass: [
        'scss/*.scss',
        'scss/**/*.scss',
    ],
    js: [
        'script.js/*.js'
    ],
    img: [
        'images/*.*',
        'images/**/*.*',
    ],
    font: [
        'font/*.*', 
         'font/**/*.*'
    ]
}

//流程
gulp.task('concatjs', function () {
    gulp.src('script.js/*.js').pipe(gulp.dest('dest/js'));
});

gulp.task('img', function () {
    gulp.src(web.img).pipe(gulp.dest('dest/img'));
});

gulp.task('font', function () {
    gulp.src(web.font).pipe(gulp.dest('dest/font'));
});


//任務串連
gulp.task('concatcss', ['sass'], function () {
    return gulp.src('css/*.css')
        .pipe(cleanCSS({
            compatibility: 'ie9'
        }))
        .pipe(gulp.dest('dest/css'));
});


gulp.task('lint', function() {
    return gulp.src('script.js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  });


gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
       .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dest/css/'));
});


//打包html


gulp.task('fileinclude', function () {
    gulp.src(['*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dest/'));
});


//壓縮圖片
gulp.task('mini_img', function () {
    return  gulp.src('images/*.*')
      .pipe(imagemin())
      .pipe(gulp.dest('dest/mini_img/'))
  });

gulp.task('watch' , function(){
  gulp.watch(['sass/*.scss' , 'sass/**/*.scss'], ['concatcss']);
  gulp.watch('js/*.js', ['concatjs']);
  gulp.watch(['*.html' , '**/*.html'],  ['fileinclude']);
});

gulp.task('default', function () {
    browserSync.init({
        server: {
            files: ['**'],
            proxy: 'http://localhost:3000',
            baseDir: "./",
            index: "game.html"
        }
    });
    gulp.watch(web.html, ['fileinclude']).on('change', reload);
    gulp.watch(web.sass, ['sass']).on('change', reload);
    gulp.watch(web.js, ['concatjs']).on('change', reload);
    gulp.watch(web.js, ['lint']).on('change', reload);
    gulp.watch(web.img, ['img']).on('change', reload);
    gulp.watch(web.font, ['font']).on('change', reload);
});