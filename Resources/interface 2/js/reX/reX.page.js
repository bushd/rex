reX.page = new Class({

	Implements: [Options, Debug, Publisher, Listener]

	options: {
		name: 'PageStub',
		init: function() {},
		onSkinLoaded: function() {},
		onMediaLoaded: function(media) {},
	},

	initialize: function(options) {
		this.setOptions(options);

		this.registerPublisher(this.name);
		this.registerListener('MediaManager', this.name);

		this.init();
	},

	onSkinLoaded: function() {	
        reX.debug('[MEDIA][' + this.name + '] skin loaded', REX_INFO];
        
        // pre process functions
        if (preProc.skinready) {
            preProc.skinready.each(function(fn, index) {
                reX.debug('[MEDIA] calling preProc SkinReady ' + index, REX_DEBUG);
                fn();
            });
        }
    
        // call user defined onSkinLoaded function
        this.options.onSkinLoaded();

        // post process functions
        if (postProc.skinready) {
            postProc.skinready.each(function(fn, index) {
                reX.debug('calling postProc SkinReady ' + index, REX_DEBUG);
                fn();
            });
        }
    },

    onMediaLoaded: function(result) {	
    	this.media = result;

        reX.debug('[MEDIA][' + this.name + '] media loaded', REX_INFO];
        
        // pre process functions
        if (preProc.onMediaLoaded) {
            preProc.onMediaLoaded.each(function(fn, index) {
                reX.debug('[MEDIA] calling preProc onMediaLoaded ' + index, REX_DEBUG);
                this.media = fn(this.media);
            }.bind(this));
        }
    
        // call user defined onSkinLoaded function
        this.media = this.options.onSkinLoaded(this.media);

        // post process functions
        if (postProc.onMediaLoaded) {
            postProc.onMediaLoaded.each(function(fn, index) {
                reX.debug('calling postProc onMediaLoaded ' + index, REX_DEBUG);
                this.media = fn(this.media);
            }.bind(this));
        }
    },

});