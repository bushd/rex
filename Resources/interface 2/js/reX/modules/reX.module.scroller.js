Module.Scroller = new Class({

	Extends: BaseModule,

	Implements: [Listener, Publisher],

	options: {
		type: 'vertical',
		listTag: 'ul',
		itemTag: 'li',
		indexPrefix: '',
		indexSuffix: '',
	},

	initialize: function(list, options) {

		this.list = list; 

		this.setOptions(options);

		this.registerPublisher('Module.Scroller');

		this.registerListener('Module.List', 'Scroller');

		this.registerListener('reX.Controls', 'Scroller');

		this.modifyList();
	},

	getItems: function() {
		return $$(this.list + ' > ' + this.options.itemTag);
	},

	modifyList: function() {
		var list = $$(this.list)[0];
		list.addClass('hasSelectable');

		var items = this.getItems();
		var maxIndex = items.length;

		for (var i = 0; i < items.length; i++) {
			this.setIndex(items[i], i + 1, maxIndex);
		}
	},

	setIndex: function(item, index, maxIndex) {
		var nextIndex = index + 1;
		var previousIndex = index - 1;

		indexValue = this.options.indexPrefix + index + this.options.indexSuffix;
		nextIndexValue = this.options.indexPrefix + nextIndex + this.options.indexSuffix;
		previousIndexValue = this.options.indexPrefix + previousIndex + this.options.indexSuffix;

		if (this.options.type === 'vertical') {
			nextIndexKey = 'data-index-down';
			previousIndexKey = 'data-index-up';
		}
		else {
			nextIndexKey = 'data-index-right';
			previousIndexKey = 'data-index-left';
		}

		var properties = {
			'data-index': indexValue
		};

		if (nextIndex > maxIndex) { 
			properties[previousIndexKey] = previousIndexValue;
		}
		else if (previousIndex <= 0) { 
			properties[nextIndexKey] = nextIndexValue;
		}
		else {
			properties[nextIndexKey] = nextIndexValue;
			properties[previousIndexKey] = previousIndexValue;
		}
		
		item.setProperties(properties);
	}
});