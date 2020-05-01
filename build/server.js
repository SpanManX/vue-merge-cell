const express = require('express');
const config = require('./webpack.dev');
const webpack = require('webpack');
const compiler = webpack(config);
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const interfaces = require('os').networkInterfaces();
const net = require('net');

const app = express();

app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        chunks: false,
        colors: true,
        modules: false,
        children: false,
        chunkModules: false,
        errorDetails: true,
        warnings: true,
        builtAt: false,
        assets: false,
        hash: false,
        performance: false,
        publicPath: false,
        reasons: false,
        entrypoints: false,
        source: false,
        timings: false,
        version: false,
    },
}));
app.use(webpackHotMiddleware(compiler, {
    log: false
}));

function getIPAddress() {
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

const LOCAL_IP = getIPAddress();

function portIsOccupied(port) {
    let server = net.createServer().listen(port);

    server.on('listening', function () {
        server.close();
        const expressServer = app.listen(port, () => {
            compiler.hooks.done.tap('BuildPlugin', (stats) => {
                console.log('\tIP:    http://%s:%s', LOCAL_IP, expressServer.address().port);
                console.log('\tLocal: http://localhost:%s', expressServer.address().port);
            })
        });
    });

    server.on('error', function (err) {
        if (err.code === 'EADDRINUSE') {
            return portIsOccupied(port += 1);
        }
    });
}

portIsOccupied(3000);
