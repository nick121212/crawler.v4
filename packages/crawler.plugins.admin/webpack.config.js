const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const env = process.env.NODE_ENV || "dev";

const __DEV__ = env.toUpperCase() == "DEV" || env.toUpperCase() == "DEVELOPMENT";
const __TEST__ = env.toUpperCase() == "UAT";
const __PROD__ = env.toUpperCase() == "PRODUCTION";
const __STAG__ = env.toUpperCase() == "STG";

module.exports = {
    entry: {
        index: ['./src/index.tsx'],
        style: ['./src/index.scss', 'tachyons', 'animate.css', './src/assets/iconfont/origin/iconfont.css', './src/assets/iconfont/crawler/iconfont.css'],
        vendor: ['react', 'antd', 'react-dom', 'redux-saga', 'react-router-dom', 'redux', 'react-router-redux', 'recompose']
    },
    devServer: {
        hot: true,
        inline: false,
        stats: { colors: true, progress: true },
        host: "127.0.0.1",
        port: 8082,
        compress: false,
        quiet: false,
        clientLogLevel: 'info',
        open: true
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].[hash:6].js',
        publicPath: '/',
    },
    devtool: __DEV__ ? "cheap-module-eval-source-map" : "cheap-module-source-map",
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.ts(x?)$/,
            loader: 'tslint-loader',
            exclude: /node_modules/,
        }, {
            test: require.resolve("react-addons-perf"),
            loader: "expose-loader?Perf"
        }, {
            test: /module\.styl/,
            loader: 'style-loader!css-loader?modules!postcss-loader!stylus-loader',
        }, {
            test: /module\.css/,
            loader: 'style-loader!css-loader?modules!postcss-loader',
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader']
            })
        }, {
            test: /\.css/,
            exclude: /module\.css/,
            loader: 'style-loader!css-loader!postcss-loader',
        }, {
            test: /\.(jsx|tsx|js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader!awesome-typescript-loader',
        }, {
            test: __DEV__ ? /dddfadsfd/ : /\.tsx/,
            exclude: /node_modules/,
            include: [path.resolve(__dirname, "src/modules/website/components")],
            use: [
                'bundle-loader?lazy',
                'babel-loader',
                'awesome-typescript-loader'
            ],
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        }, {
            test: /\.json/,
            loader: 'json-loader',
        }, {
            test: /\.(jpg|png|jpeg)/,
            loader: 'file-loader',
        }, {
            test: /content\/.*\.svg$/,
            loader: 'file-loader',
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]', 'sass-loader']
            })
        }, {
            test: /content\/.*\.svg$/,
            loader: 'file-loader',
        }, {
            test: /icons\/.*\.svg$/,
            loader: 'raw-loader!svgo-loader?{"plugins":[{"removeStyleElement":true}]}',
        }, { test: /\.md/, loader: 'raw-loader' },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml' },
        { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff" },
        { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff" },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream" },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" }],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(env),
            },
            "__DEV__": JSON.stringify(__DEV__),
            "__TEST__": JSON.stringify(__TEST__),
            "__PROD__": JSON.stringify(__PROD__),
            "__STAG__": JSON.stringify(__STAG__)
        }),
        __DEV__ ? new HtmlWebpackPlugin({
            // favicon: 'static/favicon.png',
            template: 'src/index.html',
        }) : new CleanWebpackPlugin(
            ['dist/**',],
            {
                root: __dirname,
                verbose: true,
                dry: false
            }
        ),
        new CopyWebpackPlugin([
            // { from: './src/modelproxy/mocks', to: 'mocks' },
            { from: './src/assets', to: 'assets' }
        ]),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    cssnano({
                        autoprefixer: {
                            add: true,
                            remove: true,
                            browsers: ['last 2 versions'],
                        },
                        discardComments: {
                            removeAll: true,
                        },
                        safe: true,
                    })
                ],
                svgo: {
                    plugins: [
                        { removeStyleElement: true },
                    ],
                }
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        }),
        new ExtractTextPlugin("styles/[name].[contenthash:6].css")
    ],
    resolve: {
        extensions: ['.js', '.tsx']
    },
    externals: {}
}