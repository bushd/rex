reX.Menu = new Class({

    Extends: Template,

	Implements: [Events, Options],

    options: {
        elements: [],
        sectionObject: {}, 
		index: 1,
		vertical: true,
		wrap: true,
		inject: 'nav',
        noBuildEvent: false,
        quickjump: 'none', // none, alphabetic, numerical
        quickjumpNumerical: 10 // only used by quickjump = numerical 
	},

	initialize: function(options) {
		this.setOptions(options);
        
        this.loadTemplate();
	},
	
	/* appends elements to the list */
	append: function(/*array*/ elements) {
		this.options.elements.append(elements);
	},
	
	/* prepends elements to the list */
	prepend: function(/*array*/ list) {
		elements.append(this.options.elements);
        this.options.elements = elements;
	},
	
    generateElements: function() {
        this.options.elements = [];
        
        if(typeOf(this.options.sectionObject) == 'array')	{
			this.options.sectionObject.each(function(item){
                this.options.substitute = item;
                this.options.elements.push(this.render());
			}.bind(this));	
		}				
		else {
			this.options.elements.push(this.render(this.options.sectionObject));
		}
    },
    
	/* insterts the list intro the html code */
	build: function() {
		var ul = new Element('ul');

		for(var i = 0; i < this.options.elements.length; i++) {
			li = undefined;
						
			if(this.options.vertical) {
				if(this.options.elements.length == 1) {
					li = new Element('li', {
						index: this.options.index,
						idx: i,
						html: this.options.elements[i]});
				}
				else if(i == 0 && this.options.wrap) {
					li = new Element('li', {
						up: this.options.elements.length - 1 + this.options.index, 
						down: i+this.options.index+1, 
						index: i+this.options.index,
						idx: i,
						html: this.options.elements[i]});
				}
				else if(i == 0 && !this.options.wrap) {
					li = new Element('li', {
						down: i+this.options.index+1, 
						index: i+this.options.index,
						idx: i,
						html: this.options.elements[i]});
				}
				else if(i == this.options.elements.length-1 && this.options.wrap) {
					li = new Element('li', {
						up: i+this.options.index-1, 
						down: this.options.index, 
						index: i+this.options.index,
						idx: i,
						html: this.options.elements[i]});
				}
				else if(i == this.options.elements.length-1 && !this.options.wrap) {
					li = new Element('li', {
						up: i+this.options.index-1,  
						index: i+this.options.index,
						idx: i,
						html: this.options.elements[i]});
				}
				else {
					li = new Element('li', {
						up: i+this.options.index-1, 
						down: i+this.options.index+1, 
						index: i+this.options.index,
						idx: i,
						html: this.options.elements[i]});
				}
			} // end if vertival
			else { // if horizontal
				if(this.options.elements.length == 1) {
					li = new Element('li', {
						index: this.options.index,
						idx: i,
						html: this.options.elements[i]});
				}
				else if(i == 0 && this.options.wrap) {
					li = new Element('li', {
						left: this.options.elements.length - 1 + this.options.index, 
						right: i+this.options.index+1, 
						index: i+this.options.index,
						idx: i,
						html: this.options.elements[i]});
				}
				else if(i == 0 && !this.options.wrap) {
					li = new Element('li', {
						right: i+this.options.index+1, 
						index: i+this.options.index,
						idx: i,
						html: this.options.elements[i]});
				}
				else if(i == this.options.elements.length-1 && this.options.wrap) {
					li = new Element('li', {
						left: i+this.options.index-1, 
						right: this.options.index, 
						index: i+this.options.index,
						idx: i,
						html: this.options.elements[i]});
				}
				else if(i == this.options.elements.length-1 && !this.options.wrap) {
					li = new Element('li', {
						left: i+this.options.index-1,  
						index: i+this.options.index,
						idx: i,
						html: this.options.elements[i]});
				}
				else {
					li = new Element('li', {
						left: i+this.options.index-1, 
						right: i+this.options.index+1, 
						index: i+this.options.index,
						idx: i,
						html: this.options.elements[i]});
				}
			}
			li.inject(ul);
		}
        
		ul.inject($$(this.options.inject)[0], 'top');
                
		if (!this.options.noBuildEvent) {
            window.fireEvent('menuDone');
        }
	}
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
						
						var menu = new reX.Menu({
                            vertical: this.options.mainVertical,
                            template: '<span class="homemenu"><b>{@title}</b></span>',
                            sectionObject: this.options.sections
                        });
                        
                        menu.generateElements();
						menu.build();
					}.bind(this))
				}
				else {
					var menu = new reX.Menu({
                        vertical: this.options.mainVertical,
                        template: '<span class="homemenu"><b>{@title}</b></span>',
                        sectionObject: reX.state.section.json
                    });
                    
                    menu.generateElements();
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