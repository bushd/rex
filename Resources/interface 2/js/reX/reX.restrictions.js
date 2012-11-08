reX.Restrictions = new Class({

	options: {
		locked: [],
		forbidden: [],
	},

	Implements: [Debug, Options],

	initialize: function(options) {

		this.setOptions(options);
	},

	getLocks: function() {
		return this.options.locked;
	},

	getForbidden: function() {
		return this.options.forbidden;
	}
});