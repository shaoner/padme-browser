const path = require('path');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');

const common = require('./common');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const prodConfig = {
    mode: 'production',
    module: {
        rules: [{
            ...common.cssRule({ sourceMap: true, importLoaders: 1, modules: true }, true),
            include: [
                common.dirs.components,
            ],
        }, {
            ...common.cssRule({ importLoaders: 2 }),
            exclude: [
                common.dirs.components,
            ],
        }],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash:5].css',
            chunkFilename: '[name].chunk.[contenthash:5].css',
        }),
        new CopyPlugin({
            patterns: [
                { from: common.dirs.assets, to: common.dirs.build },
                { from: path.join(common.dirs.public, 'manifest.json'), to: common.dirs.build },
            ],
        }),
    ],
};

module.exports = merge(common.webpack, prodConfig);
