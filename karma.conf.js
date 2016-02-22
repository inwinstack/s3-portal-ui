module.exports = (config) => {
  config.set({
    // toggle whether to watch files and rerun tests upon incurring changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      // 'Chrome',
      'PhantomJS',
    ],

    // web server port
    port: 9876,

    // enable colors in the output
    colors: true,

    // if true, Karma runs tests once and exits
    singleRun: true,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],

    // list of files/patterns to load in the browser
    files: [
      'node_modules/babel-polyfill/browser.js',
      'karma.spec.js',
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'karma.spec.js': ['webpack'],
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            // transpile all files except testing sources with babel as usual
            test: /\.spec\.js$/,
            loaders: ['babel'],
            exclude: /node_modules/,
          },
          {
            test: /\.css$/,
            loader: 'null',
          },
          {
            test: /\.html$/,
            loader: 'raw',
          },
        ],
        postLoaders: [
          {
            // transpile and instrument only testing sources with isparta
            test: /\.js$/,
            exclude: [
              /node_modules/,
              /\.spec\.js$/,
            ],
            loader: 'isparta',
          }
        ]
      }
    },

    webpackServer: {
      noInfo: true // prevent console spamming when running in Karma!
    },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    // set coverage reporters
    coverageReporter: {
      reporters: [
        { type: 'text' },
        { type: 'html', subdir: 'html' },
      ]
    },
  });
};
