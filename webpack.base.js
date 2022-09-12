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
	mypage: './javascripts/mypage/index.tsx',
	userNew: './javascripts/users/new.tsx',
	sessionNew: './javascripts/sessions/new.tsx',
	bookShow: './javascripts/books/show.tsx',
	userHeader: './javascripts/shared/userHeader.tsx'
    },

    output: {
        path: path.resolve(__dirname, 'public', 'assets'),
        filename: '[name]-[fullhash].js'
    },

    module: {
        rules: [
	    {
		test: /\.(ts|tsx)$/,
		use: ['babel-loader'],
		exclude: /node_modules/
	    },
	    {
		test: /\.(ts|tsx)$/,
		use: ['ts-loader'],
		exclude: /node_modules/
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
