//  Still deciding if I like pre comma lines to make it look 'cleaner' in commits and styling for this
var path              = require('path')
  , webpack           = require('webpack')
  , HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: [
    './app/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    //  Handles HTML File build
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template:  path.resolve(__dirname, 'app') + '/index.html',
    }),
    new webpack.HotModuleReplacementPlugin()
    //  Make it Ugly and Stuff
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //   },
    //   output: {
    //     comments: false,
    //   }
    // })
  ]
};
