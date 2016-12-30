var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');

var dev_webroot='dev_webroot';
var pro_webroot='webroot';

/*压缩css*/
gulp.task('minify-css', function() {
    return gulp.src('dev_webroot/css/**/*.css')
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest(pro_webroot+'/css/'));
});




/* 压缩js*/
var uglify = require('gulp-uglify');
	gulp.task('compress', function () {
	  return gulp.src('dev_webroot/js/**/*.js')
	    .pipe(uglify({
            //mangle: true,//类型：Boolean 默认：true 是否修改变量名
            mangle: {except: ['define','require' ,'exports' ,'module' ,'$']}//排除混淆关键字
        }))
	    .pipe(gulp.dest(pro_webroot+'/js/'))
	    .on('error', function(err) {
	      console.error('Error in compress task', err.toString());
	    });
	});


/*压缩图片*/
var  imagemin = require('gulp-imagemin');

gulp.task('imagemin', () =>
    gulp.src(dev_webroot + '/images/ryx_wl/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest(pro_webroot+'/images/ryx_wl/'))
);


var browserSync = require('browser-sync').create();
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "localhost:3000",
         files: [
        dev_webroot + '/css/**/*.css',
        dev_webroot + '/js/**/*.js',
        dev_webroot + '/images/**',
        dev_webroot + '/fonts/*',
        'html_views/**/*.html',
        'html_views/index.html'
      ]
    });
});



/* 合并 */

// var gulp = require('gulp'),
//     concat = require('gulp-concat');
 
// gulp.task('testConcat', function () {
//     gulp.src('src/js/*.js')
//         .pipe(concat('all.js'))//合并后的文件名
//         .pipe(gulp.dest('dist/js'));
// });

gulp.task('default', ['browser-sync']);
gulp.task('build', ['minify-css', 'compress','imagemin']);