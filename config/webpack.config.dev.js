const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const utils = require('./utils.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
    mode: 'development',
    output: {
        filename: utils.assetsPath('js/[name].bundle.[hash:7].js'),
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    devtool: "inline-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html')
        }),
        // new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        hot: true,
        compress: true,
        port: 3111,
        host: '0.0.0.0',
        publicPath: '/',
        historyApiFallback: {
            index: '/index.html'
        }
    }
})