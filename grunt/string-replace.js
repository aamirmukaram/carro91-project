module.exports = {
	layout1: {
		files: {
			'LAYOUT-1/STANDARD/master/_config.constant.js': 'LAYOUT-1/STANDARD/assets/js/config.constant.js'

		},
		options: {
			replacements: [{
				pattern: /\.\.\/\.\.\//g,
        		replacement: '../'
			}]
		}
	}
};

