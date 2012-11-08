TestListener = new Class({

	Extends: Listener,

	Implements: [Debug],

	initialize: function() {
		self = this;

		MessageCenter.registerListener('Module.List', 'testListener', this);
	},

	inform: function(message, informer, data) {
		self.log('informed:');
		self.log(message);
		self.log(informer);
		self.log(data);
	}
});