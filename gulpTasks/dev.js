'use strict';

const gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('build:dev', done => {
    return runSequence(
        'clean:build',
        'compile:withSourceMaps',
        'copy:angular2',
        'copy:html',
        'copy:vendor-css',
        'copy:vendor-js',
        'copy:assets',
        'less-to-css',
        'index-html',
        done
    )
});
