Module.List = new Class({

	Extends: BaseModule,

	Implements: [Listener, Publisher, Substitute, Debug],

	options: {
		type: 'vertical',
		hasSelectable: true,
		listTag: 'ul',
		listTagAttributes: {
			id: 'list'
		},
		itemTag: 'li',
		itemTagAttributes: {},
		indexPrefix: '',
		indexSuffix: '',
	},

	initialize: function(container, items, options) {
		this.container = container;
		this.items = items;

		console.log(options);

		this.setOptions(options);

		console.log(this.options.itemTagAttributes);

		this.registerPublisher('Module.List');

		this.prepareItems();
		this.prepareAttributesForItems();
		this.generateList();
	},

	prepareItems: function() {
		this.preparedItems = [];

		if(typeOf(this.items) == 'array')	{
			this.items.each(function(item){
              	this.preparedItems.push(this.substituteWith(this.options.template, item));
			}.bind(this));	
		}				
		else {
			this.preparedItems.push(this.substituteWith(this.options.template, this.items));
		}
	},

	prepareAttributesForItems: function() {
		this.preparedAttributesForItems = [];

		this.log('[MODULE.LIST] prepare Attributes', REX_DEBUG);

		console.log(this.options.itemTagAttributes);

		if(typeOf(this.items) == 'array')	{
			this.items.each(function(item){
				console.log(this.options.itemTagAttributes);
                this.preparedAttributesForItems.push(this.prepareAttributes(this.options.itemTagAttributes, item));
			}.bind(this));	
		}				
		else {
			//this.preparedAttributesForItems.push(this.render(this.items));
		}

		this.log('[MODULE.LIST:prepareAttributesForItems] end');
	},

	generateList: function() {
		var list = new Element(this.options.listTag, this.options.listTagAttributes);
		list.addClass(this.options.type + 'List');

		console.log(this.preparedAttributesForItems);

		for (var i = 0; i < this.preparedItems.length; i++) {


			var attributesForItem = {};
			if (i < this.preparedAttributesForItems.length) {
				attributesForItem = this.preparedAttributesForItems[i];
			}

			var attributes = Object.merge(
						attributesForItem,
						{
							html: this.preparedItems[i]
						}
			);

			var item = new Element(this.options.itemTag, attributes);

			item.inject(list);
		}

		container = $$(this.container)[0];
		list.inject(container);
	},

	prepareAttributes: function(obj, substitute) {
		var result = Object.clone(obj);
		this.log('[MODULE.LIST:prepareAttributes] begin');


		console.log(obj);

		Object.each(obj, function(value, key) {
			this.log('[MODULE.LIST:prepareAttributes] value: ' + value);
			result[key] = this.substituteWith(value, substitute);
		}.bind(this));

		Object.each(obj, function(value, key) {
			result[key] = this.substituteWith(value, substitute);
		}.bind(this));

		return result;
	},
/*
	setIndex: function(item, i, maxIndex) {
		var index = i;
		var nextIndex = index + 1;
		var previousIndex = index - 1;

		if (nextIndex > maxIndex) { 
			nextIndex = 1; 
		}
		else if (previousIndex <= 0) { 
			previousIndex = maxIndex; 
		}

		index = this.options.indexPrefix + index + this.options.indexSuffix;
		nextIndex = this.options.indexPrefix + nextIndex + this.options.indexSuffix;
		previousIndex = this.options.indexPrefix + previousIndex + this.options.indexSuffix;

		if (this.options.type === 'vertical') {
			item.setProperties({
				'data-index': index,
				'data-index-right': nextIndex,
				'data-index-left': previousIndex
			});
		}
		else {
			item.setProperties({
				'data-index': index,
				'data-index-down': nextIndex,
				'data-index-up': previousIndex
			});
		}

		return item;
	},
*/
	next: function() {
		this.informListeners('next', {});
	},

	prev: function() {
		this.informListeners('prev', {});
	}



});