'use strict';

const gulp = require('gulp'),
    inject = require('gulp-inject'),
    buildConfig = require('../gulp.config');

gulp.task('index-html', () => {
    let injectables = gulp.src([].concat(
        buildConfig.source.cssFiles,
        buildConfig.source.jsFiles
    ), { read: false });

    return gulp.src(buildConfig.source.index)
        .pipe(inject(injectables, {
            addRootSlash: false,
            removeTags: true,
            ignorePath: buildConfig.buildFolders.root
        }))
        .pipe(gulp.dest(buildConfig.buildFolders.root));
});
