/*
 * The MIT License (MIT)
 * Copyright (c) 2020 Quantower LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * */

require('es6-promise').polyfill(); /* usemin requires this */
var gulp = require('gulp');

gulp.task('usemin', function() {
  var usemin = require('gulp-usemin');
  // var uglify = require('gulp-uglify');
  var rename = require("gulp-rename");
  var minifyCss = require('gulp-minify-css');
  return gulp.src('app/index.html')
    .pipe(rename("quantower-paperwallet.html"))
    .pipe(usemin({
      inlinejs: [ 'concat' ],
      inlinecss: [ minifyCss(), 'concat' ]
    }))
    .pipe(gulp.dest('dist'));

});

gulp.task('clean', function (done) {
  var del = require('del');
  del(['dist'], done);
});

gulp.task('play', ['usemin'], function () {
  var http = require('http');
  var connect = require('connect');
  var serveStatic = require('serve-static');
  var port = 9001, app;
  gulp.watch(['app/**/*'], ['usemin']);

  app = connect().use(serveStatic(__dirname));
  http.createServer(app).listen(port, function () {
    //open('http://localhost:' + port + '/dist');
  });
});

gulp.task('build', ['clean','usemin']);

gulp.task('default', ['play']);
