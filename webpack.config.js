const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const path = require('path');

const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

const common = {
    resolve: {
        modules: [path.resolve(__dirname), 'node_modules'],
        extensions: ['.js']
    },
    output: {
        path: PATHS.build,
        filename: 'index.js',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [TARGET === 'start' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.jsx$|\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.css',
            chunkFilename: '[id].css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};

if (TARGET === 'start') {
    module.exports = merge(common, {
        entry: {
            app: `${PATHS.app}/index.js`
        },
        mode: 'development',
        watchOptions: {
            ignored: /node_modules/
        },
        devtool: 'inline-source-map',
        devServer: {
            disableHostCheck: true,
            contentBase: PATHS.build,
            historyApiFallback: true,
            hot: true,
            stats: 'errors-only',
            host: 'localhost',
            port: 8080
        }
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {
        entry: {
            app: `${PATHS.app}/Rummernote.js`
            // app: `${PATHS.app}/test.js`
        },
        externals: [
            {
                react: {
                    root: 'React',
                    commonjs2: 'react',
                    commonjs: 'react',
                    amd: 'react'
                },
                'react-dom': {
                    root: 'ReactDOM',
                    commonjs2: 'react-dom',
                    commonjs: 'react-dom',
                    amd: 'react-dom'
                },
                jquery: {
                    root: '$',
                    commonjs2: 'jquery',
                    commonjs: 'jquery',
                    amd: 'jquery'
                }
            }
        ],
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        },
        mode: 'production'
    });
}
