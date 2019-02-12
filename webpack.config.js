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
	source: path.join(__dirname, '_glasses'),
    build: path.join(__dirname, '_buildglasses')
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
				favicon: '_glasses/favicon.png',
				filename: 'index.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/index/index.pug',
			}),	
			
			new HtmlWebpackPlugin({
				favicon: '_glasses/favicon.png',
				filename: 'catalog-anons.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/catalog-anons/catalog-anons.pug',
			}),	
			
			new HtmlWebpackPlugin({
				favicon: '_glasses/favicon.png',
				filename: 'catalog-oschki.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/catalog-oschki/catalog-oschki.pug',
			}),				
			
			new HtmlWebpackPlugin({
				favicon: '_glasses/favicon.png',
				filename: 'catalog-oschki2.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/catalog-oschki2/catalog-oschki2.pug',
			}),	
		
			new HtmlWebpackPlugin({
				favicon: '_glasses/favicon.png',
				filename: 'detail_sun.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/detail_sun/detail_sun.pug',
			}),	
			
			new HtmlWebpackPlugin({
				favicon: '_glasses/favicon.png',
				filename: 'detail_sun2.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/detail_sun2/detail_sun2.pug',
			}),	
			
			new HtmlWebpackPlugin({
				favicon: '_glasses/favicon.png',
				filename: 'delivery.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/delivery/delivery.pug',
			}),	
			
			new HtmlWebpackPlugin({
				favicon: '_glasses/favicon.png',
				filename: 'about.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/about/about.pug',
			}),	
			
			new HtmlWebpackPlugin({
				favicon: '_glasses/favicon.png',
				filename: 'cart.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/cart/cart.pug',
			}),	
			
			new HtmlWebpackPlugin({
				favicon: '_glasses/favicon.png',
				filename: 'cart_order.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/cart_order/cart_order.pug',
			}),	
			
			new HtmlWebpackPlugin({
				favicon: '_glasses/favicon.png',
				filename: 'lk1.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/lk1/lk1.pug',
			}),	
			
			new HtmlWebpackPlugin({
				favicon: '_glasses/favicon.png',
				filename: 'lk2.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/lk2/lk2.pug',
			}),	
			
			new HtmlWebpackPlugin({
				favicon: '_glasses/favicon.png',
				filename: 'lk3.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/lk3/lk3.pug',
			}),	
			
			new HtmlWebpackPlugin({
				favicon: '_glasses/favicon.png',
				filename: 'contacts.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/contacts/contacts.pug',
			}),	
			
			new HtmlWebpackPlugin({
				favicon: '_glasses/favicon.png',
				filename: 'registation.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/registation/registation.pug',
			}),	
			
			new HtmlWebpackPlugin({
				favicon: '_glasses/favicon.png',
				filename: 'autorization.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/autorization/autorization.pug',
			}),	
			
			new HtmlWebpackPlugin({
				favicon: '_glasses/favicon.png',
				filename: 'otziv.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/otziv/otziv.pug',
			}),	
			
			new HtmlWebpackPlugin({
				favicon: '_glasses/favicon.png',
				filename: 'cart_order_pay.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/cart_order_pay/cart_order_pay.pug',
			}),	
			
			new HtmlWebpackPlugin({
				favicon: '_glasses/favicon.png',
				filename: 'stock.html',
				chunks: ['common', 'custom'],
				template: PATHS.source + '/pages/stock/stock.pug',
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

