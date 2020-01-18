const merge = require("webpack-merge");
const common = require("./webpack.common");
const TeserJSPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

process.env.NODE_ENV = "production";

module.exports = merge(common, {
	mode: "production",
	devtool: "source-map",
	optimization: {
		minimize: true,
		minimizer: [new TeserJSPlugin({}), new OptimizeCssAssetsPlugin({})]
	}
});
