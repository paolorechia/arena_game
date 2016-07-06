var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');

module.exports  = {

  context: __dirname,
  devtool: debug ? 'inline_sourcemap' : null,
  entry:   './public/javascripts/scripts.ts',
  resolve: {
      extensions: ['', '.js', '.ts', '.tsx']
  },
  devtool: 'source-map', // if we want a source map
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'webpack-typescript?target=ES5&jsx=react'
      }
    ]
  },
  output: {
    path: __dirname + '/public/build/js',
    filename: 'scripts.js'
  }
};
