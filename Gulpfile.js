var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var concat       = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/sass/**/*.scss", ['sass']);
    gulp.watch("app/js/**/*.js", ['js']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/sass/styles.scss")
        .pipe(sass({
          includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(autoprefixer({
          browsers: ['last 2 versions', '> 5%'],
          cascade: false
        }))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src("app/js/modules/*.js")
        .pipe(concat('app.js'))
        .pipe(gulp.dest("app/js"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve', 'js']);
