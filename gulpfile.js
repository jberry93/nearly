var gulp = require("gulp"),
    wiredep = require("wiredep").stream;

gulp.task("bower", function() {
  gulp.src("./views/*.html")
    .pipe(wiredep())
    .pipe(gulp.dest("./views/"));
});
