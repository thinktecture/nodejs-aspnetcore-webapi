'use strict';

const gulp = require('gulp'),
    liveServer = require('gulp-server-livereload'),
    runSequence = require('run-sequence'),
    watch = require('gulp-watch'),
    buildConfig = require('../gulp.config');

gulp.task('live-reload', () => {
    return runSequence(
        'build:dev',
        'live-reload:start-server',
        () => {
            deltaWatch();
        }
    )
});

gulp.task('live-reload:start-server', function () {
    return gulp.src(buildConfig.buildFolders.root)
        .pipe(liveServer({
            livereload: true,
            open: false
        }));
});

function deltaWatch() {
    watch(buildConfig.sourceFolder, { base: buildConfig.sourceFolder }, vinyl => {
        if (!vinyl.event) {
            return;
        }

        if (vinyl.path.indexOf('.ts') > -1) {
            return runSequence('compile:withSourceMaps');
        }

        if (vinyl.path.indexOf('.less') > -1) {
            return runSequence('less-to-css');
        }

        if (vinyl.path.indexOf('index.html') > -1) {
            return runSequence('index-html');
        }

        if (vinyl.path.indexOf('.html') > -1) {
            return runSequence('copy:html');
        }
    });
}
