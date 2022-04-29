const path = require('path');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');

const common = require('./common');

const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const prodConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                ...common.cssRule({ sourceMap: true, importLoaders: 1, modules: true }, true),
                include: [
                    common.dirs.app,
                ],
            },
            {
                test: /\.scss$/,
                exclude: [
                    common.dirs.app,
                ],

                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                quietDeps: true,
                            }
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:5].css',
            chunkFilename: 'css/[name].chunk.[contenthash:5].css',
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
