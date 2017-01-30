"use strict"
/**
 * Created by garusis on 26/01/17.
 */

require('babel-core/register')
require('babel-polyfill')


const babel = require('gulp-babel')
const del = require('del')
const gulp = require('gulp')
const runSequence = require('run-sequence')
const sourcemaps = require('gulp-sourcemaps')
const config = require('config')
const merge = require('merge-stream')
const nodemon = require('gulp-nodemon')
const Promise = require('bluebird')

const info = require('./package.json')

let app


runSequence.use(gulp)

gulp.task('clean', (cb) => del(['./dist'], cb))

gulp.task('compile', function () {
    return gulp.src(['./**/*.js', '!./vendor/**/*', '!./node_modules/**/*', '!./dist/**/*', '!./*'])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.', {sourceRoot: './'}))
        .pipe(gulp.dest('dist/'))
})

gulp.task('copy', function () {
    return merge([
        gulp.src([
            './**/*',                                           //  Copy all inside root folders, except
            '!./**/*.js',                                       //  .js files that will be compiled,
            '!./vendor/**/*', '!./node_modules/**/*',           //  vendors and node_modules,
            '!./dist/**/*',                                     //  files at dist,
            '!./*'                                              //  and files on project root
        ]).pipe(gulp.dest('dist/'))
    ])
})

gulp.task('build', function (callback) {
    runSequence(
        'clean',
        ['compile', 'copy'],
        callback
    )
})

gulp.task('start-server', function () {
    nodemon({
        script: info.main,
        watch: 'dist',
        env: process.env
    })
})

gulp.task('run', function (callback) {
    runSequence(
        'build',
        'start-server',
        callback
    )
})

gulp.task('default', ['build'])
gulp.task('heroku:development', ['build'])