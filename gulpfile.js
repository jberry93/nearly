var gulp = require("gulp"),
    nodemon = require("gulp-nodemon"),
    wiredep = require("wiredep").stream;

gulp.task("bower", function() {
  gulp.src("./views/*.html")
    .pipe(wiredep())
    .pipe(gulp.dest("./views/"));
});

gulp.task("nodemon", function() {
  nodemon({
    script: "server.js",
    ext: "js"
  });
});

gulp.task("default", ["nodemon"]);
