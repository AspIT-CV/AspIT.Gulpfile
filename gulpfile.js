/**
 * GULP
 */
const gulp = require('gulp')
const rename = require('gulp-rename');
// var pump = require('pump');

// Image compression
const imagemin = require('gulp-imagemin');

// SASS transpiling
const sass = require('gulp-sass');

// CSS minify
const csso = require('gulp-csso');

// CSS autoprefixer
const autoprefixer = require('gulp-autoprefixer');

// JavaScript transpiling
// Remember .babelrc in root directory
const babel = require('gulp-babel')

// JavaScript uglify and minify
const uglify = require('gulp-uglify');

// Live Preview
const browserSync = require('browser-sync').create();


/**
 * ------------------------
 * DEVELOPMENT TASKS
 * 
 * * Sass transpiling
 * * Live browser preview
 * * Watch for changes
 * 
 * run: gulp
 * ------------------------
 */


/**
 * SASS TRANSPILING
 * gulp-sass
 */
// Definerer en gulp task kaldet sass
gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass())
    
    // Flyt css filer ind i css mappen
    .pipe(gulp.dest('src/css'))
    
    // Reload browserSync
    .pipe(browserSync.reload({
      stream: true
    }))
});


/**
 * AUTOPREFIXER
 * gulp-autoprefixer
 */
// Definerer en gulp task kalder autoprefixer
gulp.task('autoprefixer', function () {
  return gulp.src('src/css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
});


/**
 * LIVE BROWSER PREVIEW
 * browser-sync
 */
// Lave en browserSync task som opdaterer browseren hvis der sker ændringer
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
})


/**
 * WATCH FOR CHANGES
 */
// Watch tasken kører en række tjek inden den starter
gulp.task('default', ['browserSync', 'sass', 'autoprefixer', 'babel'], function () {
  gulp.watch('src/scss/*.scss', ['sass']);

  // Reloader browser ved ændringer i .html filer
  gulp.watch('src/*.html', browserSync.reload);

  // Reloader browser ved ændringer i .js filer
  gulp.watch('src/js/**/*.js', browserSync.reload);
})



/**
 * ------------------------
 * DISTRIBUTE 
 * 
 * * Minify CSS
 * * Optimize images
 * * Copy fonts
 * 
 * * JavaScript transpile 
 * * Minify and Uglify JS
 * 
 * run: gulp dist
 * ------------------------
 */


/**
 * MINIFY CSS
 * gulp-csso
 * gulp-rename
 */
gulp.task('csso', function () {
  return gulp.src('src/css/styles.css')
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'))
})

/**
 * OPTIMIZE IMAGES
 * gulp-imagemin
 */
gulp.task('images', function () {
  return gulp.src('src/images/**/*.(png|jpg|gif|svg)')
    .pipe(imagemin({
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'))
});

/**
 * COPYING FONTS
 * 
 */
gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

/**
 * JAVASCRIPT TRANSPILE
 * gulp-babel
 */
gulp.task('babel', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

/**
 * MINIFY JAVASCRIPT
 * gulp-uglify
 */
// gulp.task('uglifyjs', function () {
//   return gulp.src('dist/js/**/*.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('dist/js'))
// });

gulp.task('dist', ['csso', 'images', 'fonts', 'babel'])


/*
* --------------------- 
* DEPLOY
*
* Upload only new files to FTP
*
* ---------------------
*/
// var gulp = require('gulp');
// var gutil = require('gulp-util');
// var ftp = require('vinyl-ftp');

// Create config.json with following object {"host":"HOSTNAME","user":"YOUR_USERNAME","password":"YOUR_PASSWORD"}
// IMPORTANT: Remember to add file to .gitignore!
// var config = require('./config/config.json');

// gulp.task('deploy', function () {
//     var conn = ftp.create({
//         host:       config.host,
//         user:       config.user,
//         password:   config.password,
//         parallel:   10,
//         log:        gutil.log
//     });

    // Define what to upload
    // var globs = [
    //     'css/**',
    //     'php/**',
    //     'js/**',
    //     'img/**',
    //     'fonts/**',
    //     'index.php',
    //     'login.php'
    // ];

//     return gulp.src( globs, { base: '.', buffer: false})
//         // Name of folder to upload to
//         .pipe( conn.newer('/folder/name'))
//         .pipe( conn.dest('/folder/name'))
// });