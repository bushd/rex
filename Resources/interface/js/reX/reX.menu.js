reX.Menu = new Class({

	Implements: [Events, Options],

	initialize: function(/*array*/ list, options) {
		this.setOptions(options);
		this.list = list;
	},
	
	/* appends elements to the list */
	append: function(/*array*/ list) {
		return this;
	},
	
	/* prepends elements to the list */
	prepend: function(/*array*/ list) {
		return this;
	},
	
	/* insterts the list intro the html code */
	build: function() {
		var ul = new Element('ul');

		for(var i = 0; i < this.list.length; i++) {
			li = undefined;
						
			if(this.options.vertical) {
				if(this.list.length == 1) {
					li = new Element('li', {
						index: this.options.index,
						idx: i,
						html: this.list[i]});
				}
				else if(i == 0 && this.options.wrap) {
					li = new Element('li', {
						up: this.list.length - 1 + this.options.index, 
						down: i+this.options.index+1, 
						index: i+this.options.index,
						idx: i,
						html: this.list[i]});
				}
				else if(i == 0 && !this.options.wrap) {
					li = new Element('li', {
						down: i+this.options.index+1, 
						index: i+this.options.index,
						idx: i,
						html: this.list[i]});
				}
				else if(i == this.list.length-1 && this.options.wrap) {
					li = new Element('li', {
						up: i+this.options.index-1, 
						down: this.options.index, 
						index: i+this.options.index,
						idx: i,
						html: this.list[i]});
				}
				else if(i == this.list.length-1 && !this.options.wrap) {
					li = new Element('li', {
						up: i+this.options.index-1,  
						index: i+this.options.index,
						idx: i,
						html: this.list[i]});
				}
				else {
					li = new Element('li', {
						up: i+this.options.index-1, 
						down: i+this.options.index+1, 
						index: i+this.options.index,
						idx: i,
						html: this.list[i]});
				}
			} // end if vertival
			else { // if horizontal
				if(this.list.length == 1) {
					li = new Element('li', {
						index: this.options.index,
						idx: i,
						html: this.list[i]});
				}
				else if(i == 0 && this.options.wrap) {
					li = new Element('li', {
						left: this.list.length - 1 + this.options.index, 
						right: i+this.options.index+1, 
						index: i+this.options.index,
						idx: i,
						html: this.list[i]});
				}
				else if(i == 0 && !this.options.wrap) {
					li = new Element('li', {
						right: i+this.options.index+1, 
						index: i+this.options.index,
						idx: i,
						html: this.list[i]});
				}
				else if(i == this.list.length-1 && this.options.wrap) {
					li = new Element('li', {
						left: i+this.options.index-1, 
						right: this.options.index, 
						index: i+this.options.index,
						idx: i,
						html: this.list[i]});
				}
				else if(i == this.list.length-1 && !this.options.wrap) {
					li = new Element('li', {
						left: i+this.options.index-1,  
						index: i+this.options.index,
						idx: i,
						html: this.list[i]});
				}
				else {
					li = new Element('li', {
						left: i+this.options.index-1, 
						right: i+this.options.index+1, 
						index: i+this.options.index,
						idx: i,
						html: this.list[i]});
				}
			}
			
			li.inject(ul);
		}
		
		ul.inject($$(this.options.inject)[0], 'top');
		window.fireEvent('menuDone');
	},
	
	options: {
		index: 1,
		vertical: true,
		wrap: true,
		inject: 'nav'
	},

	list: undefined
});

reX.HomeMenu = new Class({
	
	Implements: [Events, Options],

	initialize: function(options) {
		this.setOptions(options);
	},
	
	/* appends elements to the list */
	appendToGroup: function(/*array*/ list, group) {
		return this;
	},
	
	/* prepends elements to the list */
	prependToGroup: function(/*array*/ list, group) {
		return this;
	},
	
	appendGroup: function(/*array*/ list, group) {
		return this;
	},
	
	build: function() {
		switch(this.options.type) {
			default:
			case 'allInOne':
				if(this.options.sections === undefined) {
					mediaManager.getSections(function(sec) {
						this.options.sections = sec;
						var j2h = new reX.json2html({
							html: '<span><b>{@title}</b></span>'
						});
						var menu = new reX.Menu(j2h.convert(this.options.sections), {vertical: this.options.mainVertical});
						menu.build();
					}.bind(this));
				}
				else {
					var j2h = new reX.json2html({
						html: '<span><b>{@title}</b></span>'
					});
					var menu = new reX.Menu(j2h.convert(this.options.sections));
					menu.build();
				}	
				break;
				
			case 'grouped':
				groups = new Array();
				if(mediaManager === undefined) {
					mediaManager = new reX.MediaManager();
				}
				if(this.options.sections === undefined) {
					mediaManager.getSections(function(sec) {
						this.options.sections = sec;
						groups = this.sortByGroup(groups);
					}.bind(this));
				}
				else {
					groups = this.sortByGroup(groups);
				}
				break;
            
            case 'custom':
                break;

		} 
	},
	
	prepare: function() {
		
	},
	
	sortByGroup: function(arr) {
		arr[0] = new Array();
		arr[1] = new Array();
		this.options.sections.each(function (item) {
			if(item['@type'] == 'artist') {
				arr[1].push(item);
			}
			else {
				arr[0].push(item);
			}
		});
		return arr;
	},
	
	sortByType: function(movie, show, music) {
		arr[0] = new Array();
		arr[1] = new Array();
		arr[2] = new Array();
		this.options.sections.each(function (item) {
			if(item['@type'] == 'artist') {
				arr[2].push(item);
			}
			else if(item['@type'] == 'movie') {
				arr[0].push(item);
			}
			else {
				arr[1].push(item);
			}
		});
		return arr;
	},
	
	getSections: function() {
		return this.options.sections;
	},
	
	options: {
		type: 'allInOne',	// normal mode, all in one list	
							// grouped (video, music) 
							// typeGrouped (movie, show, audio) 
							// extended (movie, show, collection, audio)
		mainVertical: true,
		groupVertical: true,
		groupNames: {
			video: 'Video',
			movie: 'Movie',
			show: 'TV Show',
			music: 'Music'
		},
		sections: undefined
	}
	
});