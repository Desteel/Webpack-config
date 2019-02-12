const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const pug = require('./webpack_config/pug');
const devserver = require('./webpack_config/devserver');
const css = require('./webpack_config/css');
const extractCSS = require('./webpack_config/css.extract');
const babel = require('./webpack_config/babel');
const images = require('./webpack_config/images');
const fonts = require('./webpack_config/fonts');

const PATHS = {
	source: path.join(__dirname, '_project'),
    build: path.join(__dirname, '_projectBuild')
};

function resolve ($dir) {
    return path.join(__dirname, '..', $dir)
}

const _common = merge([
    {
		mode: 'production',
        entry: {
			'common': PATHS.source + '/js/common.js',
			'custom': PATHS.source + '/js/custom/custom.js',
		},
        output: {
			path: PATHS.build,
			filename: './assets/js/[name].js',			
			libraryTarget: 'umd',
			library: '[name]',
			umdNamedDefine: true,
			libraryExport: 'default'
		},
		optimization: {
			minimizer: [new UglifyJsPlugin({
				exclude: /\/custom/,
				uglifyOptions: {
					output: {
						comments: false,
					},
				},
			})]
			// minimize: false,
			// splitChunks: {
			// 	cacheGroups: {
			// 		commons: {
			// 			minChunks: 2,
			// 			name: 'common',
			// 			chunks: 'all',
            // 			enforce: true
			// 		}
			// 	}
			// }
		},
		externals: {
			jquery: '$'
		},
        plugins: [
			new HtmlWebpackPlugin({
				favicon: '_project/favicon.png',
				filename: 'index.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/index/index.pug',
			}),	
			
			
			// new webpack.ProvidePlugin({
			// 	$: 'jquery',	 
			// 	jQuery: 'jquery'    
			// }),
		],
	},	
    pug(),
	images(),
	fonts(),
	babel()
]);


module.exports = (env, argv) => {
	if (argv.mode === 'production') {		
		return merge([
			_common,
			extractCSS()
		]);
	} 
	if (argv.mode === 'development') {
        return merge([
            _common,
            devserver(),
			css()
        ]);
    }
};

