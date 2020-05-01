const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const autoprefixer = require("autoprefixer");

module.exports = merge(common, {
    mode: 'development',
    entry: ["webpack-hot-middleware/client?noInfo=true", "@babel/polyfill", './src/main.js'],
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'vue-style-loader',
                    },
                    {
                        loader: 'css-loader',
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
                test: /\.scss$/,
                include: [path.resolve(__dirname, '../src')],
                exclude: [path.resolve(__dirname, '../node_modules')],
                use: [
                    'vue-style-loader',
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader",
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
                    },
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            },
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new webpack.NoEmitOnErrorsPlugin,
    ]
});
