const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('server', () => {
  browserSync({
    server: {
      baseDir: 'dist',
    },
  });

  gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('styles', () => {
  return gulp
    .src('src/sass/**/*.+(scss|sass)', { encoding: false })
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', () => {
  gulp.watch('src/sass/**/*.+(scss|sass|css|less)', gulp.parallel('styles'));
  gulp.watch('src/*.html').on('change', gulp.parallel('html'));
});

gulp.task('html', () => {
  return gulp
    .src('src/*.html', { encoding: false })
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', () => {
  return gulp
    .src('src/js/**/*.js', { encoding: false })
    .pipe(gulp.dest('dist/js'));
});

gulp.task('fonts', () => {
  return gulp
    .src('src/fonts/**/*.js', { encoding: false })
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('icons', () => {
  return gulp
    .src('src/icons/**/*', { encoding: false })
    .pipe(gulp.dest('dist/icons'));
});

gulp.task('mailer', () => {
  return gulp
    .src('src/mailer/**/*', { encoding: false })
    .pipe(gulp.dest('dist/mailer'));
});

gulp.task('images', () => {
  return gulp
    .src('src/images/**/*', { encoding: false })
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task(
  'default',
  gulp.parallel(
    'watch',
    'server',
    'styles',
    'scripts',
    'fonts',
    'icons',
    'mailer',
    'html',
    'images'
  )
);
