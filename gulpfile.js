const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();


function styles() {
    return gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream())

}

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', styles);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
    browserSync.init(
        {
            server: {
                baseDir: "./"
            },
            ui:false,
        }
    );
});


gulp.task('css', async function () {
    gulp.src('./css/*.css')
        .pipe(concat('styles.min.css'))
        .pipe(minify())
        .pipe(gulp.dest('./css'));
});


// gulp.task('default', ['serve']);


