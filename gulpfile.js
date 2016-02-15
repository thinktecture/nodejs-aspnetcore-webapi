'use strict';

require('./gulpTasks/compile');
require('./gulpTasks/clean');
require('./gulpTasks/dev');
require('./gulpTasks/index');
require('./gulpTasks/copy');
require('./gulpTasks/liveReload');
require('./gulpTasks/less');

const gulp = require('gulp');

gulp.task('watch', ['live-reload']);
