const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = env => {
	console.log("NODE_ENV", env.NODE_ENV);
	return {
		mode: "development",
		entry: "./src/index.js",
		output: {
			filename: "main.js",
			path: path.resolve(__dirname, "dist")
		},
		devServer: {
			contentBase: "./dist"
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
								hmr: env.NODE_ENV === "development",
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
};
