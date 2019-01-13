const path = require('path');
const MinCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  target: 'node',
  entry: {
    app: path.resolve(__dirname, '../server/index.js'),
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
}
