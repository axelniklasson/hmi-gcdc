var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://172.20.10.3:8080',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel'
      },
      {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ]
      },
      {
        test: /\.(png|jpg)$/, 
        loader: 'file?name=[path][name].[hash].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.css']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './',
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
