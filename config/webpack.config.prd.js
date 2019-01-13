const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const utils = require('./utils.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        filename: utils.assetsPath('js/[name].bundle.[chunkhash:7].js'),
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    externals: {
        // 'antd': 'antd',/*不推荐，无法使用按需加载*/
        'react': 'react',
        'react-dom': 'react-dom',
        'react-redux': 'react-redux',
        'react-router-config': 'react-router-config',
        'react-router-dom': 'react-router-dom',
        'redux': 'redux'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    name: 'vender',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        runtimeChunk: {
            name: "manifest"
        },
    },
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], {
            root: path.resolve(__dirname, '../'),
            verbose: true
        }),
        new webpack.HashedModuleIdsPlugin(),
    ]
})