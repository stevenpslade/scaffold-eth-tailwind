const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");
const sourcemaps = require("gulp-sourcemaps");

gulp.task("css", () => {
  return gulp.src('src/index.css')
    .pipe( sourcemaps.init() )
    .pipe( postcss([ tailwindcss, autoprefixer() ]) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('./public') )
});