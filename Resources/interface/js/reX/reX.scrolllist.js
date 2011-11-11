reX.Scrolllist = new Class({
	
	Implements: [Events, Options],

	initialize: function(root, options) {
		this.setOptions(options);
		this.root = $$(root)[0];
		var ul = $$(root+' ul')[0];
		this.container = new Element('div#reX_scrolllist_'+getRandom(1000, 9999)).wraps(ul);
		this.container.setStyle('position', 'relative');
		this.size = this.container.getChildren('ul')[0].getChildren('li').length;
		
		if(this.options.vertical){
			this.options.fx.property = 'top';
		}
		else {
			this.options.fx.property = 'left';
		}
		
		this.fx = new Fx.Tween(this.container, this.options.fx);
		
		if(this.options.stepSize == undefined) {
			if(this.options.vertical){
                var el = ul.getChildren('li')[1];
				this.options.stepSize = el.getSize().y + el.getProperty('marginTop') + el.getProperty('marginBottom');
                reX.debug('[MENU] stepsize: ' + this.options.stepSize, REX_DEBUG);
				this.container.setStyle('top', this.options.offset*this.options.stepSize);
			} 
			else {
                var el = ul.getChildren('li')[1];
				this.options.stepSize = el.getSize().x + el.getProperty('marginLeft') + el.getProperty('marginRight');
                reX.debug('[MENU] stepsize: ' + this.options.stepSize, REX_DEBUG);
				this.container.setStyle('left', this.options.offset*this.options.stepSize);
			}
		}
	},
	
	seekNext: function() {
        this.fx.cancel();
		if (this.options.index < this.size-1) this.options.index++;
		else this.options.index = 0;
		
		var pos;
		if (this.options.vertical) {
            var el = $$('li[idx]:not(.focus)')[1];
            pos = this.container.getStyle('top');
            stepsize = el.getSize().y + el.getProperty('marginTop') + el.getProperty('marginBottom');
        }
		else {
            var el = $$('li[idx]:not(.focus)')[1];
            pos = this.container.getStyle('left');
            stepsize = el.getSize().x + el.getProperty('marginLeft') + el.getProperty('marginRight'); 
        }
        
		this.fx.start(parseInt(pos), this.options.index * -stepsize + this.offset);
	},
	
	seekPrev: function() {
        this.fx.cancel();
        if (this.options.index > 0) this.options.index--;
		else this.options.index = this.size-1;
		
		var pos;
		if (this.options.vertical) {
            var el = $$('li[idx]:not(.focus)')[1];
            pos = this.container.getStyle('top');
            stepsize = el.getSize().y + el.getProperty('marginTop') + el.getProperty('marginBottom');
        }
		else {
            var el = $$('li[idx]:not(.focus)')[1];
            pos = this.container.getStyle('left');
            stepsize = el.getSize().x + el.getProperty('marginLeft') + el.getProperty('marginRight'); 
        }
		
		this.fx.start(parseInt(pos), this.options.index * -stepsize + this.offset);
	},
    
    move: function(index) {
        this.fx.cancel();
    
        if (!index) {
            index = $$('li.focus')[0].getProperty('idx');
        }
        
        var pos;
		if (this.options.vertical) {
            var el = $$('li[idx]:not(.focus)')[1];
            pos = this.container.getStyle('top');
            stepsize = el.getSize().y + el.getProperty('marginTop') + el.getProperty('marginBottom');
        
            //pos = this.container.getStyle('top');
            //stepsize = $$('li[idx]:not(.focus)')[0].getSize().y;
            this.fx.start(parseInt(pos), index * -stepsize - this.offset);

        }
		else {
            var el = $$('li[idx]:not(.focus)')[1];
            pos = this.container.getStyle('left');
            stepsize = el.getSize().x + el.getProperty('marginLeft') + el.getProperty('marginRight')
        
            //pos = this.container.getStyle('left');
            //stepsize = $$('li[idx]:not(.focus)')[0].getSize().x; 
            this.fx.start(parseInt(pos), index * -stepsize - this.offset);

        }
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
			duration: 200,
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