var gulp = require("gulp"),
    nodemon = require("gulp-nodemon"),
    mocha = require("gulp-mocha"),
    concat = require("gulp-concat"),
    htmlMin = require("gulp-minify-html"),
    cssMin = require("gulp-minify-css"),
    imageMin = require("gulp-imagemin"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    wiredep = require("wiredep").stream;

gulp.task("nodemon", function() {
  nodemon({
    script: "server/server.js",
    ext: "js"
  })
});

gulp.task("combineApp", function() {
  return gulp.src([
    "client/app/*.module.js",
    "client/app/*.js"
  ])
    .pipe(concat("myApp.js"))
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("server/public"));
});

gulp.task("test", function() {
  return gulp.src("client/js/test.js").pipe(mocha());
});

gulp.task("smashVendors", function() {
  return gulp.src([
    "client/bower_components/angular/angular.min.js",
    "client/bower_components/angular-route/angular-route.min.js",
    "client/bower_components/jquery/dist/jquery.min.js",
    "client/bower_components/bootstrap/dist/js/bootstrap.min.js"
  ]).pipe(concat("vendor.min.js")).pipe(gulp.dest("server/public"));
});

gulp.task("compressJS", function() {
  return gulp.src("client/js/*.js")
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("server/public"));
});

gulp.task("compressHTML", function() {
  return gulp.src([
    "client/views/*.html",
    "client/app/go/*.html"
  ])
    .pipe(htmlMin())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("server/public"));
});

gulp.task("compressCSS", function() {
  return gulp.src("client/views/*.css")
    .pipe(cssMin())
    .pipe(rename({
      suffix:".min"
    }))
    .pipe(gulp.dest("client/views/"));
});

gulp.task("smashCSS", function() {
  return gulp.src([
    "client/bower_components/bootstrap/dist/css/bootstrap.min.css",
    "client/views/default.min.css"
  ])
    .pipe(concat("all.css"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("server/public"));
});

gulp.task("watchjs", function() {
  gulp.watch("*.js", ["test"]);
});

gulp.task("bower", function() {
  gulp.src("./views/*.html")
    .pipe(wiredep())
    .pipe(gulp.dest("./views/"));
});

gulp.task("default", ["nodemon", "watchjs"]);
