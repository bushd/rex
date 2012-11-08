MEDIATYPE_MOVIE  = 'movie';
MEDIATYPE_SHOW   = 'show';
MEDIATYPE_CLIP   = 'clip';
MEDIATYPE_MUSIC  = 'music';
MEDIATYPEPICTURE = 'picture';

reX.myPlexToken = '';

reX.MediaManager = new Class({

    Implements: [Publisher, Events, Options],

	initialize: function(options) {
        reX.debug('[MEDIAMANAGER] initialize', REX_INFO);
        if(options != undefined) {
            this.setOptions(options);
        }

        this.registerPublisher('MediaManager');

        this.date = new Date();
    },

    registerMediaLoader: function(loader, type) {
        this.medialoader[type].push(loader);
    },
    
    get: function(type, key, data) {
    	if (typeof(data) !== 'object') {
    		data = {}; 
    	}

    	//requst uid to identify request
    	var uid = generateUID(); 

    	var loader = this.medialoder[type];
    	loader.get(key, data, function(result) {
    		this.informListeners(uid, result), 
    	});

    	return uid;
    },

    generateUID: function() {
    	return this.date.getTime();
    }

    medialoder: {},

    options: {}
});