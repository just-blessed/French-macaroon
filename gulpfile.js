const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

function compileLess() {
    return gulp.src('src/styles/style.less')
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('dist/css'));
}

function watchLess() {
    gulp.watch('src/styles/*.less', compileLess);
}

exports.default = gulp.series(compileLess, watchLess);






// var minifyCSS = require('gulp-minify-css'); // сжимает, оптимизирует
// var rename = require("gulp-rename"); // переименовывает
// gulp.task('less', function () {
//     gulp.src('./src/styles/styles.css')
//         .pipe(less()) // конвертиуем less в css
//         .pipe(minifyCSS()) // минифицируем css
//         .pipe(rename({suffix: ".min"}))
//         .pipe(gulp.dest('./dist')); // помещаем результат в папку dist
// });