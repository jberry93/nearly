var gulp = require("gulp"),
    nodemon = require("gulp-nodemon"),
    mocha = require("gulp-mocha"),
    wiredep = require("wiredep").stream;

gulp.task("bower", function() {
  gulp.src("./views/*.html")
    .pipe(wiredep())
    .pipe(gulp.dest("./views/"));
});

gulp.task("test", function() {
  return gulp.src("test.js").pipe(mocha());
});

gulp.task("watchjs", function() {
  gulp.watch("*.js", ["test"]);
});

gulp.task("nodemon", function() {
  nodemon({
    script: "server.js",
    ext: "js"
  }).on("start", ["test"]);
});

gulp.task("default", ["nodemon", "watchjs"]);
