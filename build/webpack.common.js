const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const hotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const happyPack = require('happyPack');

module.exports = {
    stats: {
        chunks: false,
        colors: true,
        modules: false,
        children: false,
        chunkModules: false,
        errorDetails: true,
        warnings: false,
    },
    output: {
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: [path.resolve(__dirname, '../node_modules')],
                include: [path.resolve(__dirname, '../src')],
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: [path.resolve(__dirname, '../node_modules')],
                include: [path.resolve(__dirname, '../src')],
                use: ['happypack/loader?id=js']
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 200000,
            maxSize:300000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                common: {
                    name: 'chunk-common',
                    test: /[\\/]src[\\/]/,
                    priority: -20,
                    reuseExistingChunk: true
                },
                elementUi: {
                    name: 'element-ui',
                    priority: 5,
                    test: /[\\/]view-design[\\/]/,
                },
                vueRouter: {
                    name: 'vue-router',
                    priority: 10,
                    test: /[\\/]vue-router[\\/]/,
                },
            },
        },
        runtimeChunk: {
            name: entrypoint => `manifest/${entrypoint.name}`
        }
    },
    resolve: {
        extensions: ['.js', '.vue', '.css', '.scss', '.json'],
        // alias:{}
    },
    plugins: [
        new VueLoaderPlugin(),
        new happyPack({
            id:'js',
            loaders:['babel-loader']
        }),
        new CopyWebpackPlugin(
            [
                {
                    from: 'public/',
                    to: ''
                },
            ]),
        new hotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};
