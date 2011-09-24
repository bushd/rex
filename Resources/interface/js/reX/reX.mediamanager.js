reX.MediaManager = new Class({

    Implements: [Events, Options],

	initialize: function(options) {
        reX.debug('[MEDIAMANGER] initialize', REX_INFO);
        if(options != undefined) {
            this.setOptions(options);
        }
    },
    
	getSections: function(callback) {
        reX.debug('[MEDIAMANGER] get Sections', REX_INFO);
    
		var result = new Array();
	
		var request = new Request.XML2JSON({
			url: this.options.baseurl+"/library/sections/", 
			method: 'get',
			onSuccess: function(json){ 
                    this.current = json;
                    if(json.MediaContainer.Directory[0] != undefined) {
						callback(json.MediaContainer.Directory);
					}
					else {
						result.push(json.MediaContainer.Directory);
						callback(result);
					}
				}.bind(this)
		}).send();
	},
	
	getSectionsByType: function(type, callback) {
        reX.debug('[MEDIAMANGER] get Sections by type ' + type, REX_INFO);
    
		var result = new Array();
		
		this.getSections(function(sections) {		
		
			sections.each(function(item) {
				if(item['@type'] == type) {
					result.push(item);
				}
			});
			
			callback(result);
		});
	},
	
	getAll: function(section, callback) {
		reX.debug('[MEDIAMANGER] get all in section ' + section, REX_INFO);
        
        var result = new Array();
	
 		if (arguments.length == 0){
   			return result;  
		}
			
		var request = new Request.XML2JSON({
			url: this.options.baseurl+"/library/sections/" + section + "/all", 
			method: 'get',
			onSuccess: function(json){ 
                    this.current = json;
					if(json.MediaContainer.Video != undefined) {
						if(json.MediaContainer.Video[0] != undefined) {
							callback(json.MediaContainer.Video);
						}
						else {
							result.push(json.MediaContainer.Video);
							callback(result);
						}
					}
					else if(json.MediaContainer.Directory != undefined) {
						if(json.MediaContainer.Directory[0] != undefined) {
							callback(json.MediaContainer.Directory);
						}
						else {
							result.push(json.MediaContainer.Directory);
							callback(result);
						}
					}
				}.bind(this)
		}).send();

	},
	
	getAllLeaves: function(key, callback) {
        reX.debug('[MEDIAMANGER] get leaves for key ' + key, REX_INFO);
    
		var result = new Array();
	
 		if (arguments.length == 0){
   			return result;  
		}
			
		var request = new Request.XML2JSON({
			url: this.options.baseurl+"/library/metadata/" +key + "/allLeaves", 
			method: 'get',
			onSuccess: function(json){ 
                    this.current = json;
					if(json.MediaContainer.Video[0] != undefined) {
						callback(json.MediaContainer.Video);
					}
					else {
						result.push(json.MediaContainer.Video);
						callback(result);
					}
				}.bind(this)
		}).send();

	},
	
	getRecentlyAdded: function(section, callback, amount) {
    
		var result = new Array();
	
		if (arguments.length == 2){
   			amount = this.options.recentlyDefaultAmount;   
		}
		else if (arguments.length == 0){
            reX.debug('[MEDIAMANGER] getRecentlyAdded without arguments', REX_WARN);
   			return result;  
		}
        
        reX.debug('[MEDIAMANGER] get last ' + amount + ' recently added of section ' + section, REX_INFO);
			
		var request = new Request.XML2JSON({
			url: this.options.baseurl+"/library/sections/" + section + "/recentlyAdded", 
			method: 'get',
			onSuccess: function(json){ 
                    this.current = json;
					for(var i = 0; i < amount; i++) {
						if(json.MediaContainer['@viewGroup'] == 'movie' || json.MediaContainer['@viewGroup'] == 'episode') {
							if(json.MediaContainer.Video == undefined || json.MediaContainer.Video[i] == undefined) {
								break;
							}
							result.push(json.MediaContainer.Video[i]);
						}
						else if(json.MediaContainer['@viewGroup'] == 'album') {
							if(json.MediaContainer.Directory == undefined || json.MediaContainer.Directory[i] == undefined) {
								break;
							}
							result.push(json.MediaContainer.Directory[i]);
						}
					}
					
					callback(result);
				}.bind(this)
		}).send();

	},
	
	getShow: function(key, callback) {
        reX.debug('[MEDIAMANGER] get show with key ' + key, REX_INFO); 
           
		var result = new Array();
	
 		if (arguments.length == 0){
   			return result;  
		}
			
		var request = new Request.XML2JSON({
			url: this.options.baseurl+key, 
			method: 'get',
			onSuccess: function(json){ 
                    this.current = json;
					if(json.MediaContainer.Directory != undefined) {
						if(json.MediaContainer.Directory[0] != undefined) {
							callback(json.MediaContainer.Directory);
						}
						else {
							result.push(json.MediaContainer.Directory);
							callback(result);
						}	
					}
				}.bind(this)
		}).send();
	},
	
	getSeasons: function(section, callback) {
        reX.debug('[MEDIAMANGER] get seasons for section ' + section, REX_INFO);
        
		var result = new Array();
	
 		if (arguments.length == 0){
   			return result;  
		}
			
		var request = new Request.XML2JSON({
			url: this.options.baseurl+section, 
			method: 'get',
			onSuccess: function(json){ 
                    this.current = json;
					if(json.MediaContainer.Directory != undefined) {
						if(json.MediaContainer.Directory[0] != undefined) {
							callback(json.MediaContainer.Directory);
						}
						else {
							result.push(json.MediaContainer.Directory);
							callback(result);
						}	
					}
				}.bind(this)
		}).send();
	},
	
	getEpisodes: function(section, callback) {
        reX.debug('[MEDIAMANGER] get episodes for section ' + section, REX_INFO);
    
		var result = new Array();
	
 		if (arguments.length == 0){
   			return result;  
		}
			
		var request = new Request.XML2JSON({
			url: this.options.baseurl+section, 
			method: 'get',
			onSuccess: function(json){ 
                    this.current = json;
                    
					if(json.MediaContainer.Video != undefined) {
						if(json.MediaContainer.Video[0] != undefined) {
							callback(json.MediaContainer.Video);
						}
						else {
							result.push(json.MediaContainer.Video);
							callback(result);
						}	
					}
				}.bind(this)
		}).send();

	},
	
	getTracks: function(section, callback) {
        reX.debug('[MEDIAMANGER] get tracks for section ' + section, REX_INFO);
    
		var result = new Array();
	
 		if (arguments.length == 0){
   			return result;  
		}
			
		var request = new Request.XML2JSON({
			url: this.options.baseurl+section, 
			method: 'get',
			onSuccess: function(json){ 
                    this.current = json;
					if(json.MediaContainer.Track != undefined) {
						if(json.MediaContainer.Track[0] != undefined) {
							callback(json.MediaContainer.Track);
						}
						else {
							result.push(json.MediaContainer.Track);
							callback(result);
						}	
					}
				}.bind(this)
		}).send();

	},
	
	getGroupedAlbums: function(section, callback) {
        reX.debug('[MEDIAMANGER] get albums (grouped) for section ' + section, REX_INFO);
    
		var result = new Array();
		var albums = new Array();
	
		if (arguments.length == 2){
   			amount = this.options.recentlyDefaultAmount;   
		}
		else if (arguments.length == 0){
   			return result;  
		}
			
		var request = new Request.XML2JSON({
				url: this.options.baseurl+"/library/sections/" + section + "/albums", 
				method: 'get',
				onSuccess: function(json) {  
                    this.current = json;
					for(var i in json.MediaContainer.Directory) {
						if(json.MediaContainer.Directory[i]['@title'] == '' || json.MediaContainer.Directory[i]['@title'] == undefined) {
							json.MediaContainer.Directory[i]['@title'] = json.MediaContainer.Directory[i]['@parentTitle'];
						}
						
						if(!albums.contains(json.MediaContainer.Directory[i]['@title'])) {
							albums.push(json.MediaContainer.Directory[i]['@title']);						
							result.push(json.MediaContainer.Directory[i]);
						}
						else {
							(result.getLast())['@type'] = 'compilation';
						}
					}
					
					callback(result);
				}.bind(this)
		}).send();
	},
	
	getMedia: function(key, callback) {
        reX.debug('[MEDIAMANGER] get media for key ' + key, REX_INFO);
    
		var result = new Array();
	
		var request = new Request.XML2JSON({
			url: this.options.baseurl+key, 
			method: 'get',
			onSuccess: function(json){ 
                    this.current = json;
					if(json.MediaContainer.Video != undefined) {
						callback(json.MediaContainer.Video);
					}
					else {
						callback(json.MediaContainer.Track.Media);
					}
				}.bind(this)
		}).send();
	},
	
	getShowByTitle: function(title, callback) {
        reX.debug('[MEDIAMANGER] get show for title ' + title, REX_INFO);
		this.getSectionsByType('show', function(sections) { 
			sections.each(function(sec) {
				this.getAll(sec['@key'], function(shows) {
					shows.each(function(show) {
						if(show['@title'] == title || show['@titleSort'] == title) {
							callback(show);
						}
					}.bind(this));
				}.bind(this));
			}.bind(this));
		}.bind(this));
	},
	
	getShowByEpisodeKey: function(key, callback) {
        reX.debug('[MEDIAMANGER] get show for episode key ' + key, REX_INFO);
		this.getSectionsByType('show', function(sections) { 
			sections.each(function(sec) {
				this.getAll(sec['@key'], function(shows) {
					shows.each(function(show) {
						this.getAllLeaves(show['@ratingKey'], function(leaves) {
							leaves.each(function(leaf) {
								if(leaf['@key'] == key || leaf['@ratingKey'] == key) {
									callback(show);
                                    return;
								}
							}.bind(this));
						}.bind(this));
					}.bind(this));
				}.bind(this));
			}.bind(this));
		}.bind(this));
	},
    
    getSeasonByEpisodeKey: function(key, callback) {
        reX.debug('[MEDIAMANGER] get season for episode key ' + key, REX_INFO);
		var request = new Request.XML2JSON({
			url: this.options.baseurl+"/library/metadata/" + key + "/allLeaves", 
			method: 'get',
			onSuccess: function(json) { 
                season = json.MediaContainer['@title1'];
                var reg = /.*([0-9]+)/;
                reg.exec(season);
                callback(RegExp.$1);
            }
        }).send();
	},
    
    getSectionInformations: function() {
        reX.debug('[MEDIAMANGER] get informations for current section', REX_INFO);
        var result = {
            art: this.current.MediaContainer['@art'],
            key: this.current.MediaContainer['@key'],
            thumb: this.current.MediaContainer['@thumb'],
            title: this.current.MediaContainer['@title1']
        };
        
        return result;
    },
    
    transcodeImage: function(url) {
        result = '/photo/:/transcode?url=http://127.0.0.1:32400'+escape(url)+'&width=1920&height=1080';
        reX.debug('[MEDIAMANGER][TRANSCODE] ' + url + ' to ' + result, REX_INFO);
        return result;
    },
	
	setWatched: function(key, callback) {
        reX.debug('[MEDIAMANGER][WATCHED] ' + key, REX_INFO);
    
		if(!callback) { callback = function(){}; }
		var request = new Request({
			url: 'http://localhost:32400/:/scrobble', 
			method: 'get',
			onRequest: function() {
				reX.debug('[REQUEST] mark Media with key '+key+' as watched', REX_DEBUG);
			},
			onSuccess: function() {
				reX.debug('[SUCCESS] marked Media with key '+key+' as watched', REX_INFO);
			},
			onFailure: function() {
				reX.debug('[FAILURE] mark Media with key '+key+' as watched', REX_ERROR);
			},
			onComplete: function() { callback(); }
		}).send('key='+key+'&identifier=com.plexapp.plugins.library');
	},
	
	setUnWatched: function(key, callback) {
        reX.debug('[MEDIAMANGER][UNWATCHED] ' + key, REX_INFO);
    
		if(!callback) { callback = function(){}; }
		var request = new Request({
			url: 'http://localhost:32400/:/unscrobble', 
			method: 'get',
			onRequest: function() {
				reX.debug('[REQUEST] mark Media with key '+key+' as unwatched', REX_DEBUG);
			},
			onSuccess: function() {
				reX.debugg('[SUCCESS] marked Media with key '+key+' as unwatched', REX_INFO);
			},
			onFailure: function() {
				reX.debug('[FAILURE] mark Media with key '+key+' as unwatched', REX_ERROR);
			},
			onComplete: function() { callback(); }
		}).send('key='+key+'&identifier=com.plexapp.plugins.library');
	},
	
	toggleWatched: function(key, callback) {
		this.getMedia(key, function(media) {
			if(media['@viewCount']) {
				this.setUnWatched(media['@ratingKey'], callback);
			}
			else {
				this.setWatched(media['@ratingKey'], callback);
			}
		}.bind(this));
	},
	
	setProgress: function(key, progress, callback) {
		if(!callback) { callback = function(){}; }
		this.getMedia(key, function(media) {
			var newProgress = media['@duration'] * (progress/100);
			
            reX.debug('[MEDIAMANGER][PROGRESS] set ' + newProgress, REX_INFO);
            
			new Request({
				url: 'http://localhost:32400/:/progress', 
				method: 'get',
				onRequest: function() {
					reX.debug('[REQUEST] update progress of media with key '+key, REX_DEBUG);
				},
				onSuccess: function() {
					reX.debug('[SUCCESS] updated progress to '+newProgress+' of media with key '+key, REX_INFO);
				},
				onFailure: function() {
					reX.debug('[FAILURE] unable to update progress of media with key '+key, REX_ERROR);
				},
				onComplete: function() { callback(); }
			}).send('key='+key+'&identifier=com.plexapp.plugins.library&time='+newProgress);
		}).send();
	},
	
	x2j: undefined,
	
	recentlyAddedCache: undefined,
    
    current: undefined,
    
    options: {
		baseurl: 'http://localhost:32400',
		recentlyDefaultAmount: 3
	},
});