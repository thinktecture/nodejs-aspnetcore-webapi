'use strict';

const path = require('path');

module.exports = {
    tsConfigFile: 'tsConfig.json',
    buildFolders: {
        root: 'build',
        vendor: path.join('build', 'vendor'),
        css: path.join('build', 'css'),
        asset: path.join('build', 'assets')
    },
    sourceFolder: path.join('src', 'ng2client'),
    source: {
        index: path.join('src', 'ng2client', 'index.html'),
        tsFiles: path.join('src', 'ng2client', '**', '*.ts') ,
        // Only the injectable js files are relevant here. But NOT the app files, since SystemJS will load them.
        jsFiles: [
            path.join('build', 'vendor', 'es6-shim.js'),
            path.join('build', 'vendor', 'system-polyfills.js'),
            path.join('build', 'vendor', 'angular2-polyfills.js'),
            path.join('build', 'vendor', 'system.src.js'),
            path.join('build', 'vendor', 'Rx.js'),
            path.join('build', 'vendor', 'angular2.dev.js'),
            path.join('build', 'vendor', 'http.dev.js'),
            path.join('build', 'vendor', 'router.dev.js'),
            path.join('build', 'vendor', '**', '*.js')
            // Uncommenting the following line will create an "Unexpected anonymous System.register call" error when the apps runs
            //'build/app/**/*.js'
        ],
        assetFiles: path.join('src', 'ng2client', 'assets', '**', '*.*'),
        vendorCssFiles: path.join('src', 'ng2client', 'vendor', '**', '*.css'),
        vendorJsFiles: path.join('src', 'ng2client', 'vendor', '**', '*.js'),
        cssFiles: [
            path.join('build', 'css', 'flakes', '*.css'),
            path.join('build', 'css', '**', '*.css')
        ],
        lessFiles: [
            path.join('src', 'ng2client', 'less', 'main.less')
        ],
        htmlFiles: [
            path.join('src', 'ng2client', '**', '*.html'),
            '!' + path.join('src', 'ng2client', 'index.html')
        ],
        angular2: [
            path.join('node_modules', 'angular2', 'bundles', 'angular2-polyfills.js'),
            path.join('node_modules', 'systemjs', 'dist', 'system.src.js'),
            path.join('node_modules', 'systemjs', 'dist', 'system-polyfills.js'),
            path.join('node_modules', 'rxjs', 'bundles', 'Rx.js'),
            path.join('node_modules', 'es6-shim', 'es6-shim.js'),
            path.join('node_modules', 'angular2', 'bundles', 'angular2.dev.js'),
            path.join('node_modules', 'angular2', 'bundles', 'http.dev.js'),
            path.join('node_modules', 'angular2', 'bundles', 'router.dev.js')
        ]
    },
    autoprefixerBrowsers: ['Chrome >= 43', 'last 2 versions']
};
