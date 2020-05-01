const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssPlugin = require("mini-css-extract-plugin");
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const autoprefixer = require("autoprefixer");
const happyPack = require('happyPack');

module.exports = merge(common, {
    mode: 'production',
    entry: ["@babel/polyfill", './src/main.js'],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader:  MiniCssPlugin.loader,
                        options: {
                            publicPath: '../'
                        },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer
                            ]
                        }
                    },
                ]
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, '../src')],
                exclude: [path.resolve(__dirname, '../node_modules')],
                use: [
                    {
                        loader:  MiniCssPlugin.loader,
                        options: {
                            publicPath: '../'
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: false,
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer
                            ]
                        }
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[contenthash:8].[ext]',
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[contenthash:8].[ext]',
                            publicPath: '../'
                        }
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: [{
                    loader: 'happypack/loader?id=html',
                }]
            },
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: 5,
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                        collapse_vars: true,
                        reduce_vars: true,
                    },
                }

            })
        ],
    },
    plugins: [
        new happyPack({
            id: 'html',

            loaders: ['html-loader']
        }),
        new CleanWebpackPlugin(),
        new MiniCssPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new optimizeCss()
    ]
});
