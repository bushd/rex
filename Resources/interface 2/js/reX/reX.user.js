reX.User = new Class({

	Implements:[Debug, reX.Restrictions],

	initialize: function() {

	},

	applyRestrictions: function(objects) {
		var returnValue = reX.filter(objects, 'id', 'notin', this.getForbidden());
		returnValue = reX.filter(returnValue, 'id', 'notin', this.getLocks());

		return returnValue;
	},

	options: {
		locked: ['6', '9'],
		forbidden: ['7', '10']
	}
});