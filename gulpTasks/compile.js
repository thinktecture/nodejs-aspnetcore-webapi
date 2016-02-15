'use strict';

const gulp = require('gulp'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    buildConfig = require('../gulp.config');

const tsProject = ts.createProject(buildConfig.tsConfigFile, {
    // Use the latest version of typescript
    typescript: require('typescript')
});

const compileSource = withSourceMaps => {
    let gulpSrc = gulp.src(buildConfig.source.tsFiles);

    if (withSourceMaps) {
        gulpSrc = gulpSrc.pipe(sourcemaps.init());
    }

    gulpSrc = gulpSrc.pipe(ts(tsProject));

    if (withSourceMaps) {
        gulpSrc = gulpSrc.pipe(sourcemaps.write('.'));
    }

    gulpSrc = gulpSrc.pipe(gulp.dest(buildConfig.buildFolders.root));

    return gulpSrc;
};

gulp.task('compile', () => {
    return compileSource();
});

gulp.task('compile:withSourceMaps', () => {
    return compileSource(true);
});
