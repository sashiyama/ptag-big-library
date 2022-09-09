const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

const manifestOptions = {
    publicPath: "",
}

const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: {
	home: './javascripts/home/index.tsx',
    },

    output: {
        path: path.resolve(__dirname, 'public', 'assets'),
        filename: '[name]-[fullhash].js'
    },

    module: {
        rules: [
	    {
		test: /\.(ts|tsx)$/,
		use: ['babel-loader']
	    },
        ]
    },

    resolve: {
        extensions: [
            '.ts', '.tsx', '.js', '.json'
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
	new WebpackManifestPlugin(manifestOptions),
        new CleanWebpackPlugin(),
    ]
}
