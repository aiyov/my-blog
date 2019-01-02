const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: "inline-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html')
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        port: 3111,
        host: '0.0.0.0',
        publicPath: '/',
        historyApiFallback: {
            index: '/index.html'
        }
    }
})