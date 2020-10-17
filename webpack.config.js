const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
	entry: {
		app: './src/js/index.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/html/index.html",
			filename: "./index.html"
		})
	]
};