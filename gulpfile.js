var gulp = require('gulp'),
  sass = require('gulp-sass')(require('sass')),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync').create();

// reload
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: `docs/`,
    },
    notify: false,
    online: false,
    tunnel: false,
  });
});

gulp.task('sass', function () {
  // task
  return gulp
    .src('src/sass/**/*.scss') // Путь к файлами
    .pipe(sass().on('error', sass.logError)) // Вывод ошибок
    .pipe(rename({ suffix: '.min', prefix: '' })) // rename
    .pipe(cleanCSS()) // clean css
    .pipe(autoprefixer({ browserlist: ['last 10 versions'], cascade: false })) // autoprefixer
    .pipe(gulp.dest('docs/css')) // Путь к папке с конечными файлами
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('js', function () {
  return gulp
    .src('src/js/**/*.js')
    .pipe(gulp.dest('docs/js'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('images', function () {
  return gulp
    .src('src/images/**/*')
    .pipe(gulp.dest('docs/images/'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('code', function () {
  return gulp
    .src('src/**/*.html')
    .pipe(gulp.dest('docs/'))
    .pipe(browserSync.reload({ stream: true }));
});

// watch
gulp.task('watch', function () {
  // task
  gulp.watch('src/sass/**/*.scss', gulp.parallel('sass'));
  gulp.watch('src/js/**/*.js', gulp.parallel('js'));
  gulp.watch('src/**/*.html', gulp.parallel('code'));
  gulp.watch('src/images/**/*', gulp.parallel('images'));
});

gulp.task('default', gulp.parallel('sass', 'js', 'images', 'code', 'browser-sync', 'watch'));
