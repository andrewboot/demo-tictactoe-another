const webpack = require('webpack');
const utils = require('./utils');
const path = require('path');

const { stripNulls, ifElse } = utils;

const env = process.env.NODE_ENV;
const isProd = env === 'production';
const isDev = !isProd;

const ifDev = ifElse(isDev);
const ifProd = ifElse(isProd);

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    path: `${__dirname}/dist/build/`,
    filename: '[name].js',
  },
  target: 'web',

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  watch: isDev,
  watchOptions: {
    ignored: /node_modules/
  },

  plugins: stripNulls([
    new webpack.EnvironmentPlugin({
      NODE_ENV: isProd ? 'production' : 'development',
    }),
    ifDev(() => new webpack.NoEmitOnErrorsPlugin()),
    ifProd(
      () =>
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true,
            warnings: false,
          },
          mangle: {
            screw_ie8: true,
          },
          output: {
            comments: false,
            screw_ie8: true,
          },
        }),
    ),
  ]),
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader'
      },
    ],
  },
};
