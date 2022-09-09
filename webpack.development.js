const webpack = require('webpack')
const { merge } = require('webpack-merge')
const path = require('path')

const base = require('./webpack.base.js')

module.exports = merge(base, {
    mode: 'development',

    devServer: {
	static: {
	    directory: path.resolve(__dirname, 'public', 'assets'),
	},
        host: '0.0.0.0',
        port: 8080,
	compress: true,
	allowedHosts: "all",
	client: {
	    overlay: true,
	    reconnect: false,
	},
	watchFiles: ['javascripts/**/*.tsx', 'javascripts/**/*.ts']
    },


    watchOptions: {
        ignored: /node_modules/
    },
})
