'use strict';

const gulp = require('gulp'),
    del = require('del'),
    path = require('path'),
    buildConfig = require('../gulp.config');

gulp.task('clean:build', () => {
    return del(path.join(buildConfig.buildFolders.root, '**'));
});
