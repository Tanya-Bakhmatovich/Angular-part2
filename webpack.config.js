const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const srcFolder = path.join(__dirname, 'src');
const entryPoint = path.join(srcFolder, 'app.js');
const indexPage = path.join(srcFolder, 'app.html');

module.exports = {
  name: 'angular',
  target: 'web',
  entry: {
    babel: 'babel-polyfill',
    app: path.resolve(entryPoint)
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.css', '.scss']
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-2'],
            plugins: [require('babel-plugin-transform-runtime')]
          }
        }
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(indexPage)
    }),
    new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
};
