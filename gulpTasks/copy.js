'use strict';

const gulp = require('gulp'),
    buildConfig = require('../gulp.config');

gulp.task('copy:angular2', () => {
    return gulp.src(buildConfig.source.angular2)
        .pipe(gulp.dest(buildConfig.buildFolders.vendor));
});

gulp.task('copy:html', () => {
    return gulp.src(buildConfig.source.htmlFiles)
        .pipe(gulp.dest(buildConfig.buildFolders.root));
});

gulp.task('copy:vendor-css', () => {
    return gulp.src(buildConfig.source.vendorCssFiles)
        .pipe(gulp.dest(buildConfig.buildFolders.css));
});

gulp.task('copy:vendor-js', () => {
    return gulp.src(buildConfig.source.vendorJsFiles)
        .pipe(gulp.dest(buildConfig.buildFolders.vendor));
});

gulp.task('copy:assets', () => {
    return gulp.src(buildConfig.source.assetFiles)
        .pipe(gulp.dest(buildConfig.buildFolders.asset));
});
