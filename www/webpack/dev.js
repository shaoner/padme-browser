const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./common');

const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: common.dirs.build,
    },
    module: {
        rules: [
            {
                ...common.cssRule({ sourceMap: true, importLoaders: 1, modules: true }),
                include: [
                    common.dirs.app,
                ],
            },
            {
                ...common.cssRule({ sourceMap: true }),
                exclude: [
                    common.dirs.app,
                ],
            }
        ],
    }
};

module.exports = merge(common.webpack, devConfig);
