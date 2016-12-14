var path = require('path');
var webpack = require('webpack');

var publicPath = '/static/';
var outputPath = 'dist';
var bundleJSName = '[name]-bundle.js';

var isTest = process.BABEL_ENV === 'test';
var isProd = process.env.NODE_ENV === 'production';

// TODO - see if vendors can come from package.json
module.exports = {
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  entry: {
    main: getEntry(['./src/index']),
    vendors: ['babel-polyfill', 'react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, outputPath),
    filename: bundleJSName,
    chunkFileName: bundleJSName,
    publicPath: publicPath
  },
  plugins: getPlugins([
    new webpack.optimize.CommonsChunkPlugin('vendors', bundleJSName)
  ]),
  module: {
    loaders: getLoaders([
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        },
        include: path.resolve(__dirname, 'src')
      }
    ])
  },
  target: "web"
};

function getLoaders(loaders) {
  return loaders;
}

function getEntry(entries) {
  return entries;
}

function getPlugins(plugins) {
  if (isProd) {
    plugins.push(
      new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin()
    );
  }
  return plugins;
}

