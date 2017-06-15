/**
 * GULP
 */
var gulp = require('gulp')
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create();


/**
 * ------------------------
 * DEVELOPMENT TASKS
 * 
 * * Sass compilation
 * * Live browser preview
 * * Watch for changes
 * 
 * run: gulp watch
 * ------------------------
 */


/**
 * SASS COMPILATION
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

// Watch kører en række tasks inden watch starter
gulp.task('default', ['browserSync', 'sass'], function () {
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