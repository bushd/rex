reX.ResourceManager = new Class({
	
    Implements: Debug,

	setCSS: function(files, onLoad) {
        count = files.length;
    
		Object.each(files, function(file, key) {
            this.log('[RESOURCEMANAGER] load css ' + file + ' with key ' + key, REX_INFO);
            Asset.stylesheet(file, {id: 'resource_'+key });
		}.bind(this));
      
        var delay = 100, counter = 0, maxAttempts = 1000;
        this.checker = (function() {
            clearInterval(this.timer);

            if(files.length == count ) {
                this.log('[RESOURCEMANAGER] all css files loaded', REX_DEBUG);
                if (onLoad) {
                    onLoad()
                };
                return;
            }
            counter++;
            if(counter >= maxAttempts) {
                return;
            }

            this.timer = this.checker.delay(delay,this);
        }.bind(this));
        this.timer = this.checker.delay('',this);

		reX.state.section.resources.css = files;
	},
	
	unsetCSS: function() {
		Object.each(reX.state.section.resources.css, function(file, key) {
            this.log('[RESOURCEMANAGER] unloading css ' + file + ' with key ' + key, REX_INFO);
			$('resource_'+key).destroy();
		}.bind(this));
        this.log('[RESOURCEMANAGER] all CSS files unloaded', REX_DEBUG);
		
		reX.state.section.resources.css = [];
	},

    setLessCSS: function(files, onLoad) {
        count = files.length;
    
        Object.each(files, function(file, key) {
            this.log('[RESOURCEMANAGER] load LessCSS ' + file + ' with key ' + key, REX_INFO);
            Asset.lessCSS(file, {id: 'resource_'+key});
        }.bind(this));
      
        var delay = 100, counter = 0, maxAttempts = 1000;
        this.checker = (function() {
            clearInterval(this.timer);

            if(files.length == count ) {
                this.log('[RESOURCEMANAGER] all LessCSS files loaded', REX_DEBUG);
                if (onLoad) {
                    onLoad()
                };

                this.log("[RESOURCEMANAGER] refreshing styles...");
                less.refresh(true);
                this.log("[RESOURCEMANAGER] ...refreshed");
                return;
            }
            counter++;
            if(counter >= maxAttempts) {
                return;
            }

            this.timer = this.checker.delay(delay,this);
        }.bind(this));
        this.timer = this.checker.delay('',this);

        reX.state.section.resources.lessCSS = files;
    },
    
    unsetLessCSS: function() {
        Object.each(reX.state.section.resources.lessCSS, function(file, key) {
            this.log('[RESOURCEMANAGER] unloading LessCSS ' + file + ' with key ' + key, REX_INFO);
            $('resource_'+key).destroy();
        }.bind(this));
        this.log('[RESOURCEMANAGER] all LessCSS files unloaded', REX_DEBUG);
        
        reX.state.section.resources.css = [];
    },
    
    setJS: function(files, onLoad) {
        count = files.length;

		Object.each(files, function(file, key) {
            if (file != '') {
                this.log('[RESOUCEMANAGER] loading JavaScript ' + file + ' with key ' + key, REX_INFO);
                Asset.javascript(file, {id: 'js_resource_'+key });
            }
		}.bind(this));
        
        var delay = 100, counter = 0, maxAttempts = 1000;
        this.checker = (function() {
            clearInterval(this.timer);

            if(files.length == count ) {
                this.log('[RESOURCEMANAGER] all JavaScript files loaded', REX_DEBUG);
                if (onLoad) onLoad();
                return;
            }
            counter++;
            if(counter >= maxAttempts) {
                return;
            }

            this.timer = this.checker.delay(delay,this);
        }.bind(this));
        this.timer = this.checker.delay('',this);
		
		reX.state.section.resources.js = files;
	},
	
	unsetJS: function() {
		Object.each(reX.state.section.resources.js, function(file, key) {
            if (file != '') { 
                this.log('[RESOURCEMANAGER] unloading JavaScript ' + file + ' with key ' + key, REX_INFO);
                $('js_resource_'+key).destroy();
            }
		}.bind(this));
        this.log('[RESOURCEMANAGER] unloaded all JavaScript files', REX_DEBUG);
		
		reX.state.section.resources.js = undefined;
	},
    
    loadImage: function(image) {
        if (!imageCache[image]) {
            this.log('[RESOURCEMANAGER] load image ' + image, REX_DEBUG);
            imageCache[image] = new Image();
            imageCache[image].src = image;
        }
        
        this.log('[RESOURCEMANAGER] return image '+image, REX_DEBUG);
        return imageCache[image];
    },
    
    imageCache: {}
});
