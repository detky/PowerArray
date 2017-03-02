var path = require('path');
var webpack = require('webpack');
process.env.NODE_ENV = 'production';
module.exports = {
	resolve: {
		// Make sure, Webpack finds import'ed and require'd files specified without extension
		// so 'import Bla from './Bla' makes webpack to look for files 'Bla', 'Bla.js' and 'Bla.jsx'
		extensions: ['', '.js']
	},
	entry: [
		// path to our 'root' module
		path.resolve(__dirname, 'src/main.js')
	],
	output: {
		// output path
		path: path.resolve(__dirname, 'dist'),
		publicPath: 'dist/',

		// Name of the resulting bundle file 
		filename: 'PowerArray.min.js'
	},
	module: {
		loaders: [
			
		]
	},
	devtool: 'source-map',
	plugins: []
};
