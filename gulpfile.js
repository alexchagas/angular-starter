var gulp          = require('gulp');
var gulpClean     = require('del');
var usemin        = require('gulp-usemin');
var uglify        = require('gulp-uglify');
var minifyCss     = require('gulp-minify-css');
var autoprefixer  = require('gulp-autoprefixer');
var rename        = require('gulp-rename');
var watchLess     = require('gulp-watch-less');
var less          = require('gulp-less');
var cachebust     = require('gulp-cache-bust');
var concat        = require('gulp-concat');
var optimizejs = require('gulp-optimize-js');

var output = 'dist/'

gulp.task('clean', function() {
    gulpClean(['./'+output+'/'])
});

gulp.task('copyFont', function() {
    return gulp.src('./src/assets/fonts/**')
        .pipe(gulp.dest(output+'assets/fonts/'));

});

gulp.task('copyImage', function() {
    return gulp.src('./src/assets/images/**')
        .pipe(gulp.dest(output+'assets/images/'));

});

gulp.task('processIndex', function() {
    return gulp.src('./src/index.html')
        .pipe(usemin({
            css: [minifyCss({
                keepBreaks: true,
                processImport: true
            }), 'concat'],
            //      html: [minifyHtml({empty: true})],
            js: [function() { return optimizejs()},function () {return uglify({ mangle: false });},'concat']  //
            //js: ['concat']
        }))
        .pipe(cachebust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest('./'+output));
});

gulp.task('copyCss',['processIndex'], function() {
    return gulp.src('./'+output+'assets/css/min.css')
      .pipe(rename('min_ori.css'))
      .pipe(gulp.dest('./'+output+'assets/css/'))
});

gulp.task('processCss',['copyCss'], function() {
      gulp.src('./'+output+'assets/css/min_ori.css')
      .pipe(rename('min.css'))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest('./'+output+'assets/css/'));
});

gulp.task('less', function() {
  return gulp.src('src/assets/less/yggdrasil.less')
    .pipe(less())
    .pipe(gulp.dest('src/assets/css'));
});

gulp.task('watch', ['less'], function() {
  gulp.watch('src/assets/less/**/*.less', ['less']);
});

gulp.task('serve', ['less', 'watch'], function() {    
    var browserSync = require('browser-sync').create();

    browserSync.watch('src/app/**').on("change", browserSync.reload);
    browserSync.watch('src/assets/css/**').on("change", browserSync.reload);
    
    // Now init the Browsersync server
    browserSync.init({
        server: "./src"
    })    
})

gulp.task('default', ['processIndex','copyFont','copyImage','copyCss','processCss']);
