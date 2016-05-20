var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');

module.exports  = {

  context: __dirname,
  devtool: debug ? 'inline_sourcemap' : null,
  entry:   './public/javascripts/scripts.js',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets : ['es2015', 'stage-0'],
          plugins : ['transform-class-properties', 'transform-decorators-legacy']
        }
      }
    ]
  },
  output: {
    path: __dirname + '/public/build/js',
    filename: 'scripts.js'
  } ,
  plugins : debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccourenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({mangle:false, sourcemap:false})
  ]
};
