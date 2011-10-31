reX.MediaManager = new Class({

    Implements: [Events, Options],

	initialize: function(options) {
        reX.debug('[MEDIAMANAGER] initialize', REX_INFO);
        if(options != undefined) {
            this.setOptions(options);
        }
    },
    
	getSections: function(callback) {
        reX.debug('[MEDIAMANAGER] get Sections', REX_INFO);
    
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
        reX.debug('[MEDIAMANAGER] get Sections by type ' + type, REX_INFO);
    
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
    
    getByType: function(type, key, callback) {
        switch (type) {
            case 'movie':
            case 'show':
            case 'all':
                this.getAll(key, callback);
                break;
                
            case 'season':
                this.getSeasons(key, callback);
                break;
                
            case 'episode':
                this.getEpisodes(key, callback);
                break;
        }
    },
    
	
	getAll: function(section, callback) {
		reX.debug('[MEDIAMANAGER] get all in section ' + section, REX_INFO);
        
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
    
    getonDeck: function(section, callback) {
		reX.debug('[MEDIAMANAGER] get onDeck for section ' + section, REX_INFO);
        
        var result = new Array();
	
 		if (arguments.length == 0){
   			return result;  
		}
			
		var request = new Request.XML2JSON({
			url: this.options.baseurl+"/library/sections/" + section + "/onDeck", 
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
                reX.debug('[MEDIAMANAGER][SUCCESS] get onDeck for section ' + section, REX_INFO);
            }.bimd(this),
            onRequest: function() {
                reX.debug('[MEDIAMANAGER][REQUEST] get onDeck for section ' + sectiony, REX_DEBUG);
            },
            onFailure: function() {
                reX.debug('[MEDIAMANAGER][FAILURE] unable to get onDeck for section ' + section, REX_ERROR);
            }
		}).send();

	},
	
	getAllLeaves: function(key, callback) {
        reX.debug('[MEDIAMANAGER] get leaves for key ' + key, REX_INFO);
    
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
            reX.debug('[MEDIAMANAGER] getRecentlyAdded without arguments', REX_WARN);
   			return result;  
		}
        
        reX.debug('[MEDIAMANAGER] get last ' + amount + ' recently added of section ' + section, REX_INFO);
			
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
        reX.debug('[MEDIAMANAGER] get show with key ' + key, REX_INFO); 
           
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
	
    getTVDB: function(ratingKey) {
        var tvdb;
        var request = new Request.XML2JSON({
			url: this.options.baseurl+'/library/metadata/'+ratingKey, 
			method: 'get',
            async: false,
			onSuccess: function(json){ 
                var guid = json.MediaContainer.Directory['@guid'];
                tvdb = guid.match(/\d+/g);
            }.bind(this)
		}).send();
    
        return tvdb[0];
    },
    
     getIMDB: function(ratingKey) {
        var imdb;
        var request = new Request.XML2JSON({
			url: this.options.baseurl+'/library/metadata/'+ratingKey, 
			method: 'get',
            async: false,
			onSuccess: function(json){ 
                var guid = json.MediaContainer.Video['@guid'];
                imdb = guid.match(/\d+/g);
            }.bind(this)
		}).send();
    
        return 'tt'+imdb[0];
    },
    
	getSeasons: function(section, callback) {
        reX.debug('[MEDIAMANAGER] get seasons for section ' + section, REX_INFO);
        
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
        reX.debug('[MEDIAMANAGER] get episodes for section ' + section, REX_INFO);
    
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
        reX.debug('[MEDIAMANAGER] get tracks for section ' + section, REX_INFO);
    
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
        reX.debug('[MEDIAMANAGER] get albums (grouped) for section ' + section, REX_INFO);
    
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
        reX.debug('[MEDIAMANAGER] get media for key ' + key, REX_INFO);
    
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
        reX.debug('[MEDIAMANAGER] get show for title ' + title, REX_INFO);
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
        reX.debug('[MEDIAMANAGER] get show for episode key ' + key, REX_INFO);
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
        reX.debug('[MEDIAMANAGER] get season for episode key ' + key, REX_INFO);
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
    
    getSectionInformations: function(key) {
    
        if(key) {
            reX.debug('[MEDIAMANAGER] get informations for section ' + key, REX_INFO);
            var result = {
                art: this.current.MediaContainer['@art'],
                key: this.current.MediaContainer['@key'],
                thumb: this.current.MediaContainer['@thumb'],
                title: this.current.MediaContainer['@title1'],
                viewGroup: this.current.MediaContainer['@viewGroup'],
            };
        }
        else {
            reX.debug('[MEDIAMANAGER] get informations for current section', REX_INFO);
            var result = {
                art: this.current.MediaContainer['@art'],
                key: this.current.MediaContainer['@key'],
                thumb: this.current.MediaContainer['@thumb'],
                title: this.current.MediaContainer['@title1'],
                viewGroup: this.current.MediaContainer['@viewGroup'],
            };
        }
        
        return result;
    },
    
    transcodeImage: function(url, height, width) {
        if (!height || !width) {
            height = 1080;
            width = 1920;
        }
        result = '/photo/:/transcode?url=http://127.0.0.1:32400'+escape(url)+'&width='+width+'&height='+height;
        reX.debug('[MEDIAMANAGER][TRANSCODE] ' + url + ' to ' + result, REX_INFO);
        return result;
    },
	
	setWatched: function(key, callback) {
        var matches = key.match(/\d+/g);
        var simpleKey = matches[0];
        
        reX.debug('[MEDIAMANAGER][WATCHED] trying to mark media with key' + simpleKey +' as watched', REX_INFO);
    
		if(!callback) { callback = function(){}; }
		var request = new Request({
			url: 'http://localhost:32400/:/scrobble', 
			method: 'get',
			onRequest: function() {
				reX.debug('[MEDIAMANAGER][REQUEST] mark Media with key '+simpleKey+' as watched', REX_DEBUG);
			},
			onSuccess: function() {
				reX.debug('[MEDIAMANAGER][SUCCESS] marked Media with key '+simpleKey+' as watched', REX_INFO);
                callback();
			},
			onFailure: function() {
				reX.debug('[MEDIAMANAGER][FAILURE] mark Media with key '+simpleKey+' as watched', REX_ERROR);
			}
		}).send('key='+simpleKey+'&identifier=com.plexapp.plugins.library');
	},
	
	setUnWatched: function(key, callback) {
        reX.debug('[MEDIAMANAGER][UNWATCHED] ' + key, REX_INFO);
    
		if(!callback) { callback = function(){}; }
		var request = new Request({
			url: 'http://localhost:32400/:/unscrobble', 
			method: 'get',
			onRequest: function() {
				reX.debug('[REQUEST] mark Media with key '+key+' as unwatched', REX_DEBUG);
			},
			onSuccess: function() {
				reX.debugg('[SUCCESS] marked Media with key '+key+' as unwatched', REX_INFO);
                callback(); 
			},
			onFailure: function() {
				reX.debug('[FAILURE] mark Media with key '+key+' as unwatched', REX_ERROR);
			}
		}).send('key='+key+'&identifier=com.plexapp.plugins.library');
	},
	
	toggleWatched: function(key, callback) {
		this.getMedia(key, function(media) {
			if(media['@viewCount']) {
				this.setUnWatched(media['@ratingKey'], callback('unwatched'));
			}
			else {
				this.setWatched(media['@ratingKey'], callback('watched'));
			}
		}.bind(this));
	},
	
	setProgress: function(key, progress, callback) {
		if(!callback) { callback = function(){}; }
		this.getMedia(key, function(media) {
			var newProgress = media['@duration'] * (progress/100);
			
            var matches = key.match(/\d+/g);
            var simpleKey = matches[0];
            
            reX.debug('[MEDIAMANAGER][PROGRESS] set ' + newProgress + 'for key ' + simpleKey, REX_INFO);

            
			new Request({
				url: 'http://localhost:32400/:/progress', 
				method: 'get',
				onRequest: function() {
					reX.debug('[REQUEST] update progress of media with key '+simpleKey, REX_DEBUG);
				},
				onSuccess: function() {
					reX.debug('[SUCCESS] updated progress to '+newProgress+' of media with key '+simpleKey, REX_INFO);
				},
				onFailure: function() {
					reX.debug('[FAILURE] unable to update progress of media with key '+simpleKey, REX_ERROR);
				},
				onComplete: function() { callback(); }
			}).send('key='+simpleKey+'&identifier=com.plexapp.plugins.library&time='+newProgress);
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