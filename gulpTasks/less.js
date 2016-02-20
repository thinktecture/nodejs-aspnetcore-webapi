'use strict';

const gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    buildConfig = require('../gulp.config');

gulp.task('less-to-css', () => {
    return gulp.src(buildConfig.source.lessFiles)
        .pipe(less())
        .pipe(autoprefixer({
            browsers: buildConfig.autoprefixerBrowsers
        }))
        .pipe(gulp.dest(buildConfig.buildFolders.css));
});
