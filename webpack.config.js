/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const preact = require.resolve('preact/src');
const compat = require.resolve('preact/compat/src');

module.exports = {
	context: __dirname,
	entry: './index',
	target: 'web',
	output: {
		publicPath: '/'
	},
	resolve: {
		alias: {
			'preact/debug': require.resolve('preact/debug'),
			'preact/devtools': require.resolve('preact/devtools'),
			'preact/hooks': require.resolve('preact/hooks/src'),
			preact: preact,
			react: compat,
			'react-dom': compat
		},
		extensions: ['.js']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					sourceMap: true,
					presets: [
						[require.resolve('@babel/preset-env')],
						[require.resolve('@babel/preset-react')]
					],
					plugins: [
						[require.resolve('@babel/plugin-transform-react-jsx-source')],
						[
							require.resolve('@babel/plugin-transform-react-jsx'),
							{ pragma: 'createElement', pragmaFrag: 'Fragment' }
						]
					]
				}
			}
		]
	},
	devtool: 'inline-source-map',
	node: {
		process: 'mock',
		Buffer: false,
		setImmediate: false
	},
	devServer: {
		historyApiFallback: true
	},
	plugins: [new HtmlWebpackPlugin()]
};
