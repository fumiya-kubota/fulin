gulp = require 'gulp'
babel = require 'gulp-babel'
browserify = require 'browserify'
watchify = require 'gulp-watchify'
sass = require 'gulp-sass'

src = './src/'
tmp = './tmp/'
dist = './server/static/'

gulp.task 'build:css', ->
  gulp
  .src(src + 'style/style.scss')
  .pipe(sass())
  .pipe(gulp.dest(dist + 'style/'))


gulp.task 'build:es6', ->
  gulp.src src + 'es6/**/*.es6'
  .pipe babel()
  .pipe gulp.dest tmp

watching = false
gulp.task 'enable-watch-mode', -> watching = true
gulp.task 'browserify', watchify (watchify) ->
  gulp.src tmp + 'index.js'
    .pipe watchify
      watch: watching
    .pipe gulp.dest dist + 'scripts'

gulp.task 'watch', ['build', 'enable-watch-mode', 'browserify'], ->
  gulp.watch(src + '**/*.es6', ['build:es6'])
  gulp.watch(src + '**/*.scss', ['build:css'])

gulp.task 'build', ['build:es6', 'build:css']

gulp.task 'default', ['build']
