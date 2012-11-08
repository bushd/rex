var Loader = {
	Movie: {},
	Show: {},
	Music: {},
	Picture: {}
}

var MediaLoader = new Class({

	Implements: [Options, Debug],

	options: {},

	initialize: function(options) {

		this.setOptions(options);

	},

	get: function(key, data, callback) {

	},

});