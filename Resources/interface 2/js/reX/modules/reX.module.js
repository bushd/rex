var Module = {}

var BaseModule = new Class({

	Extends: Template,

	Implements: [Options],

	options: {},

	initialize: function(options) {

		this.setOptions(options);

	}

});