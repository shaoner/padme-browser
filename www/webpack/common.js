const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const srcDir = path.join(__dirname, '../src');
const appDir = path.join(srcDir, 'app');
const buildDir = path.join(__dirname, '../build');
const publicDir = path.join(__dirname, '../public');

const assetsDir = path.join(publicDir, 'assets');

module.exports.cssRule = (cssOptions, isProd = false) => ({
    enforce: 'pre',
    test: /\.(sass|scss|css)$/,
    use: [
        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        {
            loader: 'css-loader',
            options: cssOptions,
        },
        { loader: 'postcss-loader', options: { sourceMap: !isProd } },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: !isProd,
                sassOptions: {
                    // disable external deps warnings
                    quietDeps: true,
                }
            }
        },
    ],
});

module.exports.dirs = {
    src: srcDir,
    build: buildDir,
    app: appDir,
    public: publicDir,
    assets: assetsDir,
};

module.exports.webpack = {
    output: {
        path: buildDir,
        filename: 'js/[name].[fullhash:8].js',
        sourceMapFilename: 'js/[name].[fullhash:8].map',
        chunkFilename: 'js/[name].chunk.[chunkhash:5].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@': srcDir,
            '@app': appDir,
        },
        modules: [
            path.resolve(__dirname, '../node_modules'),
        ],
    },
    experiments: {
        syncWebAssembly: true,
    },
    entry: {
        main: path.join(srcDir, 'bootstrap.js'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: [
                            ['@babel/plugin-transform-runtime'],
                            [
                                '@babel/plugin-transform-react-jsx',
                                {
                                    pragma: 'h',
                                    pragmaFrag: 'Fragment',
                                },
                            ],
                        ],
                    },
                },
            },
            {
                test: /\.wasm$/,
                type: 'webassembly/sync',
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.EnvironmentPlugin({
            'VERSION': '0.0.0',
            'GIT_SHA': '',
            'GIT_LINK': '',
        }),
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            template: path.join(publicDir, 'index.html'),
            filename: 'index.html',
            chunks: ['main'],
            favicon: path.join(assetsDir, 'icons/favicon-48x48.png'),
        }),
        ProgressBarPlugin({
            format: '\u001b[97m\u001b[44m Build \u001b[49m\u001b[39m [:bar] \u001b[32m\u001b[1m:percent\u001b[22m\u001b[39m (:elapseds) \u001b[2m:msg\u001b[22m',
            renderThrottle: 100,
            summary: false,
            clear: true,
        }),
    ],
};
