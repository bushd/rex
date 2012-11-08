var Overlay = new Class({

	Implements: [Debug, Options, Listener, Publisher, Template],

	options: {
		modal: true,
		position: 'center', // center, topleft, topright, bottomleft, bottomright
		template: '<a>This is a Overlaybox</a>',
		append: 'overlaybox'
	},

	initialize: function(options) {
		this.setOptions(options);

		this.body = $$('body')[0];
	},

	show: function() {

		this.boxwrapper = new Element('section', {class: 'overlayboxwrapper overlayboxwrapperCentered'});
		this.box = new Element('div', {id: this.options.append, class: 'overlaybox overlayboxCentered'});

		this.box.inject(this.boxwrapper);

		if (this.options.modal) {
			this.modal = new Element('div', {class: 'modal'});

			document.getElements('body')[0].appendChild(this.modal);
		}

		document.getElements('body')[0].appendChild(this.boxwrapper);
		this.parse();
	},

	hide: function() {
		this.box.destroy();
		this.modal.destroy();
	}

});
