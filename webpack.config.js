var path = require('path');
var webpack = require('webpack');

var publicPath = '/static/';
var outputPath = 'dist';
var bundleJSName = '[name]-bundle.js';

var isTest = process.env.BABEL_ENV === 'test';
var isProd = process.env.NODE_ENV === 'production';

console.log('webpack running, isProd? ' + isProd + ' isTest: ' + isTest);

module.exports = {
  devtool: isProd ? 'source-map' : 'cheap-module-source-map',
  entry: getEntry(),
  output: {
    path: path.join(__dirname, outputPath),
    filename: bundleJSName,
    chunkFileName: bundleJSName,
    publicPath: publicPath
  },
  plugins: getPlugins(),
  module: {
    loaders: getLoaders([
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        },
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'tests')]
      }
    ])
  },
  target: "web"
};

function getLoaders(loaders) {
  return loaders;
}

function getEntry() {
  if (isTest) {
    return {
      maintestable: ['./src/index'],
      tests: ['./tests/index.js']
    };
  }
  else {
    return {
      main: ['./src/index'],
      vendors: ['babel-polyfill', 'react', 'react-dom']
    };
  }
}

function getPlugins() {
  var plugins = isTest ? [] : [new webpack.optimize.CommonsChunkPlugin('vendors', bundleJSName)];
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

