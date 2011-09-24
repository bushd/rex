reX.Scrolllist = new Class({
	
	Implements: [Events, Options],

	initialize: function(root, options) {
		this.setOptions(options);
		this.root = $$(root)[0];
		var ul = $$(root+' ul')[0];
		this.container = new Element('div#reX_scrolllist_'+getRandom(1000, 9999)).wraps(ul);
		//this.root.setStyle('position', 'relative');
		this.container.setStyle('position', 'absolute');
		this.root.setStyle('overflow','hidden');
		this.size = this.container.getChildren('ul')[0].getChildren('li').length;
		
		if(this.options.vertical){
			this.options.fx.property = 'top';
		}
		else {
			this.options.fx.property = 'right';
		}
		
		this.fx = new Fx.Tween(this.container, this.options.fx);
		
		if(this.options.stepSize == undefined) {
			if(this.options.vertical){
				this.options.stepSize = $$(ul)[0].getChildren('li')[0].getSize().y;
				this.container.setStyle('top', this.options.offset*this.options.stepSize);
			} 
			else {
				this.options.stepSize = $$(ul)[0].getChildren('li')[0].getSize().x;
				this.container.setStyle('right', this.options.offset*this.options.stepSize);
			}
		}
		
		this.offset = this.options.offset*this.options.stepSize;
		
	},
	
	seekNext: function() {
		if(this.options.index < this.size-1) this.options.index++;
		else this.options.index = 0;
		
		var pos;
		if(this.options.vertical) pos = this.container.getStyle('top');
		else pos = this.container.getStyle('right');
		
		this.fx.start(parseInt(pos), this.options.index * -this.options.stepSize + this.offset);
	},
	
	seekPrev: function() {
			if(this.options.index > 0) this.options.index--;
		else this.options.index = this.size-1;
		
		var pos;
		if(this.options.vertical) pos = this.container.getStyle('top');
		else pos = this.container.getStyle('right');
		
		this.fx.start(parseInt(pos), this.options.index * -this.options.stepSize + this.offset);
	},
	
	options: {
		vertical: true,
		steps: 1,
		stepSize: undefined,
		index: 0,
		offset: 0,
		fx: {
			fps: 25,
			link: 'cancel',
			duration: 50,
			transition: 'sine:in:out',
			property: 'top'
		},
	},
	
	fx: undefined,
	size: 0,
	root: undefined,
	container: undefined,
	offset: 0
});