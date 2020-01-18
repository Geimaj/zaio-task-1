const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist")
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html"
		}),
		new MiniCssExtractPlugin()
	],
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: true,
							reloadAll: true
						}
					},
					"css-loader",
					"sass-loader"
				]
			}
		]
	}
};
