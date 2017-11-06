'use strict';

const path              = require('path');
const webpack           = require('webpack');
const webpackMerge      = require('webpack-merge');
const eslintFormatter   = require('react-dev-utils/eslintFormatter');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('semantic/semantic.min.css');

const DEVELOPMENT_CONFIG = require('./config/webpack.dev');
const PRODUCTION_CONFIG  = require('./config/webpack.prod');
const {
  APP_PATH,
  NODE_MODULES_PATH
} = require('./config/paths');

const {
  cssLoader,
  sassLoader,
  postcssLoader
} = require('./config/loaders');

const ENV = process.env.NODE_ENV;
const VALID_ENVIRONMENTS = ['development', 'production'];

if (!VALID_ENVIRONMENTS.includes(ENV)) {
  throw new Error(`${ ENV } is not valid environment!`);
}

const config = {
  development: DEVELOPMENT_CONFIG,
  production:  PRODUCTION_CONFIG
}[ENV];

const isVendor = ({ resource }) => (
  resource &&
  resource.indexOf('node_modules') >= 0 &&
  resource.match(/\.js$/)
);

const COMMON_CONFIG = {
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              emitWarning: true
            },
            loader: 'eslint-loader'
          }
        ],
        include: APP_PATH
      },
      {
        test: /\.(sass)$/,
        include: APP_PATH,
        use: [
          'style-loader',
          cssLoader,
          postcssLoader,
          sassLoader
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: extractCSS.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      },
    ]
  },

  resolve: {
    extensions: [
      '.js',
      '.sass',
      '.css'
    ],
    modules: [
      NODE_MODULES_PATH
    ],
    alias: {
      components: path.resolve(APP_PATH, 'components'),
      config:     path.resolve(APP_PATH, 'config'),
      reducers:   path.resolve(APP_PATH, 'reducers')
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: isVendor
    }),

    new webpack.NamedChunksPlugin(),

    new htmlWebpackPlugin({
      title: 'react webpack-2 react-hot-loader-v3 react-router-v4 boilerplate',
      template: './config/index.ejs',
      chunks: ['vendor', 'client'],
      inlineManifestWebpackName: 'webpackManifest',
    }),
    extractCSS,
  ],

  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};

module.exports = webpackMerge.smart(COMMON_CONFIG, config);

