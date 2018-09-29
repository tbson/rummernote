const webpack = require('webpack');
const merge = require('webpack-merge');

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
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)|\.otf($|\?)/,
                loader: 'file-loader',
                options: {
                    limit: 4096,
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
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
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            })
        ]
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {
        entry: {
            app: `${PATHS.app}/Rummernote.js`
        },
        mode: 'production'
    });
}
