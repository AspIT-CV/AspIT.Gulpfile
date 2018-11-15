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
// Remember babel config in package.json
const babel = require('gulp-babel')
const browserify = require('browserify');
const babelify = require('babelify');
const vinylSrc = require('vinyl-source-stream');
const vinylBuf = require('vinyl-buffer');

// JavaScript uglify and minify
const uglify = require('gulp-uglify');

// Live Preview
const browserSync = require('browser-sync').create();

/*  */
var pathTo = {
    src: 'src',
    srcHTML: 'src/**/*.html',
    srcSCSS: 'src/scss/*.scss',
    srcJS: 'src/js/**/*.js',
    srcJSentry: 'src/js/es2015.js', // INSERT THE PATH AND NAME OF YOUR MAIN JS FILE HERE !!!
    srcIMG: 'src/images/**/*.+(png|jpg|gif|svg)',
    // srcIMG: 'src/images/**/*.{png,jpg,gif,svg}', // OBS! Der må ikke være mellemrum imellem filtyperne.
    srcFonts: 'src/fonts/**/*',

    tmpCSSfolder: 'src/css/',
    tmpCSSfiles: 'src/css/*.css',

    distCSS: 'dist/css/',
    distJS: 'dist/js/',
    distIMG: 'dist/images/',
    distFonts: 'dist/fonts/'
};


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
  return gulp.src( pathTo.srcSCSS )
    .pipe(sass())

    // Flyt css filer ind i css mappen
    .pipe(gulp.dest( pathTo.tmpCSSfolder ))

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
  return gulp.src( pathTo.tmpCSSfiles )
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe( gulp.dest( pathTo.tmpCSSfolder ) )
});


/**
 * LIVE BROWSER PREVIEW
 * browser-sync
 */
// Lave en browserSync task som opdaterer browseren hvis der sker ændringer
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: pathTo.src
    },
  })
})


/**
 * WATCH FOR CHANGES
 */
// Watch tasken kører en række tjek inden den starter
gulp.task('default', ['browserSync', 'sass', 'autoprefixer', 'babel'], function () {
  gulp.watch( pathTo.srcSCSS, ['sass']);

  // Reloader browser ved ændringer i .html filer
  gulp.watch( pathTo.srcHTML, browserSync.reload);

  // Reloader browser ved ændringer i .js filer
  gulp.watch( pathTo.srcJS, browserSync.reload);
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
gulp.task('csso', ['sass'], function () {
  // return gulp.src('src/css/styles.css')
    return gulp.src( pathTo.tmpCSSfiles )
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest( pathTo.distCSS ))
});

/**
 * OPTIMIZE IMAGES
 * gulp-imagemin
 */
gulp.task('images', function () {
  return gulp.src( pathTo.srcIMG )
    .pipe( imagemin({ interlaced: true }) )
    .pipe( gulp.dest( pathTo.distIMG ) )
});

/**
 * COPYING FONTS
 *
 */
gulp.task('fonts', function () {
  return gulp.src( pathTo.srcFonts )
    .pipe(gulp.dest( pathTo.distFonts ))
});

/**
 * JAVASCRIPT TRANSPILE
 * gulp-babel
 */
gulp.task('babel', function () {
    return gulp.src( pathTo.srcJS )
        .pipe( babel() )
        .pipe( gulp.dest( pathTo.distJS ) );
});

gulp.task('bundle', function () {
    return browserify({ entries: pathTo.srcJSentry, debug: false }) // debug enables sourcemaps - not needed for distribution code
        .transform( 'babelify' )
        .bundle()
        .pipe( vinylSrc( 'script.js' ))
        .pipe( vinylBuf() )
        .pipe( uglify() )
        .pipe( gulp.dest( pathTo.distJS ) );
});

/**
 * MINIFY JAVASCRIPT
 * gulp-uglify
 */
// gulp.task('uglifyjs', function () {
//   return gulp.src('dist/js/**/*.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('dist/js'))
// });

gulp.task('dist', ['csso', 'images', 'fonts', 'bundle']);


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
