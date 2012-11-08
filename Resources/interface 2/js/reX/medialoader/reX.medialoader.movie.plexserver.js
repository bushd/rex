Loader.Show.PlexServer = Loader.Movie.PlexServer = new Class({

	Extends: MediaLoader,

	options: {
		baseurl: 'http://localhost:32400',
		jsonMap: {
			sections: JSON.encode(jsonmap.plexserver.sections),
			movie: JSON.encode(Object.merge(jsonmap.plexserver.baseContainer, jsonmap.plexserver.movie)),
			show: JSON.encode(Object.merge(jsonmap.plexserver.baseContainer, jsonmap.plexserver.show)),
			season: JSON.encode(Object.merge(jsonmap.plexserver.baseContainer, jsonmap.plexserver.season)),
			episode: JSON.encode(Object.merge(jsonmap.plexserver.baseContainer, jsonmap.plexserver.episode)),
			media: JSON.encode(jsonmap.plexserver.media),
		},
	},

	initialize: function() {
		this.substitute = new Substitute();
	},

	get: function(key, data, callback) {
		this.log('[MEDIAMANAGER] get all in section ' + key, REX_INFO);
       
		var result = new Array();
	
 		if (arguments.length < 3){
   			return result;  
		}


        if(typeof(data['filter']) == 'undefined') {
        	data['filter'] = 'all';
        }

        if(typeof(data['type']) == 'undefined') {
        	data['type'] = 'movielist';
        }

        console.log(data);

        var requestURL = '';
        var fn;
        switch (data['type'].toLowerCase()) {

        	case 'sections':
        		console.log('sections');
        		requestURL = this.options.baseurl+"/library/sections/";

        		fn = (function(json, callback) {
        				console.log(json);

        				if(typeof(json.MediaContainer.Directory) != undefined) {
		                    if(json.MediaContainer.Directory[0] != undefined) {

		                    	json.MediaContainer.Directory.each(function(item) {
		                    		result.push( this.mapSectionsResult(item) );
		                    	}.bind(this));

		                        callback(result);
		                    }
		                    else {
		                        result.push( this.mapSectionsResult(json.MediaContainer.Directory) );
		                        callback(result);
		                    }
		                }
        			}.bind(this));	
        			break;

        	case 'movielist':
        			console.log('list');
        			requestURL = this.options.baseurl+"/library/sections/" + key + "/" + data['filter'];

        			fn = (function(json, callback) {
        				if(json.MediaContainer.Video != undefined) {
		                    if(json.MediaContainer.Video[0] != undefined) {

		                    	json.MediaContainer.Video.each(function(item) {
		                    		result.push( this.mapMovieResult(item) );
		                    	}.bind(this));

		                        callback(result);
		                    }
		                    else {
		                        result.push( JSON.decode(this.mapMovieResult(json.MediaContainer.Video)) );
		                        callback(result);
		                    }
		                }
        			}.bind(this));	
        			break;

        	case 'movie':
        			console.log('movie');
        			requestURL = this.options.baseurl+"/library/metadata/" + key;

        			fn = (function(json, callback) {
        				console.log(json);

        				if(json.MediaContainer.Video != undefined) {
		                    if(json.MediaContainer.Video[0] != undefined) {

		                    	json.MediaContainer.Video.each(function(item) {
		                    		result.push( this.mapMovieResult(item) );
		                    	}.bind(this));

		                        callback(result);
		                    }
		                    else {
		                        result.push( this.mapMovieResult(json.MediaContainer.Video) );
		                        callback(result);
		                    }
		                }
        			}.bind(this));	
        			break;

        	case 'episode':
        			console.log('episode');
        			requestURL = this.options.baseurl+"/library/metadata/" + key;

        			fn = (function(json, callback) {
        				console.log(json);

        				if(json.MediaContainer.Video != undefined) {
		                    if(json.MediaContainer.Video[0] != undefined) {

		                    	json.MediaContainer.Video.each(function(item) {
		                    		result.push( this.mapEpisodeResult(item) );
		                    	}.bind(this));

		                        callback(result);
		                    }
		                    else {
		                        result.push( this.mapEpisodeResult(json.MediaContainer.Video) );
		                        callback(result);
		                    }
		                }
        			}.bind(this));	
        			break;

        	case 'season':
        			console.log('season');
        			requestURL = this.options.baseurl+"/library/metadata/" + key + "/children";

        			fn = (function(json, callback) {
        				console.log(json);

        				if(json.MediaContainer.Video != undefined) {
		                    if(json.MediaContainer.Video[0] != undefined) {

		                    	json.MediaContainer.Video.each(function(item) {
		                    		result.push( this.mapSeasonResult(item) );
		                    	}.bind(this));

		                        callback(result);
		                    }
		                    else {
		                        result.push( this.mapSeasonResult(json.MediaContainer.Video) );
		                        callback(result);
		                    }
		                }
        			}.bind(this));	
        			break;

        	case 'seasonlist':
        			console.log('season');
        			requestURL = this.options.baseurl+"/library/metadata/" + key + "/children";

        			fn = (function(json, callback) {
        				console.log(json);

        				if(json.MediaContainer.Directory != undefined) {
		                    if(json.MediaContainer.Directory[0] != undefined) {

		                    	json.MediaContainer.Directory.each(function(item) {
		                    		result.push( this.mapSeasonListResult(item) );
		                    	}.bind(this));

		                        callback(result);
		                    }
		                    else {
		                        result.push( this.mapSeasonListResult(json.MediaContainer.Directory) );
		                        callback(result);
		                    }
		                }
        			}.bind(this));	
        			break;

        	case 'show':
        			console.log('season');
        			requestURL = this.options.baseurl+"/library/sections/" + key + "/" + data['filter'];

        			fn = (function(json, callback) {
        				console.log(json);

        				if(json.MediaContainer.Directory != undefined) {
		                    if(json.MediaContainer.Directory[0] != undefined) {

		                    	json.MediaContainer.Directory.each(function(item) {
		                    		result.push( this.mapShowResult(item) );
		                    	}.bind(this));

		                        callback(result);
		                    }
		                    else {
		                        result.push( this.mapShowResult(json.MediaContainer.Directory) );
		                        callback(result);
		                    }
		                }
        			}.bind(this));	
        			break;

        	default:
        			console.log('default');
        			fn = (function() {callback({})});;
        			break;
        }


		var request = new Request.XML2JSON({
			async: false,
			url: requestURL,
			method: 'get',
			onRequest: function() {
				console.log('requesting');
			},
			onFailure: function(xhr) {
				console.log(xhr.status);
			},
			onTimeout: function() {
				console.log('timeout');
			},
			onException: function(headerName, value) {
				console.log(headerName);
				console.log(value);
			},
			onComplete: function() {
				console.log('Reuqest complete');
			},
			onSuccess: function(json){ 
                fn(json, callback);
            }
        }).send();
	},

	mapMovieResult: function(subs) {

		var returnValue = JSON.decode(this.options.jsonMap.movie.substitute(subs));

		returnValue['imdb'] = this.getIMDB(subs['@guid']);
		returnValue['country'] = subs.Country['@tag'];

		var media = this.toArray(subs['Media']);
		media.each(function (mediaItem) {
			returnValue['media'].push( JSON.decode(this.options.jsonMap['media'].substitute(mediaItem)) );

			var part = this.toArray(mediaItem['Part']);
			part.each(function (item) {
				returnValue['media'][0]['files'].push(item['@file']);
			}.bind(this));
		}.bind(this));

		var roles = this.toArray(subs.Role);
		roles.each(function(role) {
			returnValue['cast'].push({'actor': role['@tag'], 'role': role['@role']});
		});

		var genre = this.toArray(subs.Genre);
		genre.each(function(entry) {
			returnValue['genre'].push(entry['@tag']);
		});

		returnValue['ratings'].push({'imdb': subs['@rating']});

		var directors = this.toArray(subs.Director);
		directors.each(function(entry) {
			returnValue['director'].push(entry['@tag']);
		});

		var writers = this.toArray(subs.Writer);
		writers.each(function(entry) {
			returnValue['writer'].push(entry['@tag']);
		});

		//returnValue['watched'] = (subs['viewCount'] >= 1 ? true : false);

		return returnValue;
	},

	mapSeasonListResult: function(subs) {

		var returnValue = JSON.decode(this.options.jsonMap.season.substitute(subs));

		return returnValue;
	},

	mapSeasonResult: function(subs) {

		var returnValue = JSON.decode(this.options.jsonMap.season.substitute(subs));

		if (subs['Media'][0] == undefined) {
			returnValue['media'].push( JSON.decode(this.options.jsonMap['media'].substitute(subs['Media'])) );

			if (subs['Media']['Part'][0] == undefined) {
				returnValue['media'][0]['files'].push(subs['Media']['Part']['@file']);
			}
			else {
				Object.each(subs['Media']['Part'], function (part) {
					returnValue['media'][0]['files'].push(part['@file']);
				});
			}
		} 
		else {
			Object.each(subs['Media'], function (media, index) {
				returnValue['media'].push( JSON.decode(this.options.jsonMap['media'].substitute(media)) );

				if (media['Part'][0] == undefined) {
					returnValue['media'][index]['files'].push(media['Part']['@file']);
				}
				else {
					Object.each(media['Part'], function (part) {
						returnValue['media'][index]['files'].push(part['@file']);
					});
				}
			}.bind(this));
		}

		return returnValue;
	},

	mapEpisodeResult: function(subs) {

		var returnValue = JSON.decode(this.options.jsonMap.episode.substitute(subs));

		returnValue['thetvdb'] = this.getTheTVDB(subs['@guid']);

		if (subs['Media'][0] == undefined) {
			returnValue['media'].push( JSON.decode(this.options.jsonMap['media'].substitute(subs['Media'])) );

			if (subs['Media']['Part'][0] == undefined) {
				returnValue['media'][0]['files'].push(subs['Media']['Part']['@file']);
			}
			else {
				Object.each(subs['Media']['Part'], function (part) {
					returnValue['media'][0]['files'].push(part['@file']);
				});
			}
		} 
		else {
			Object.each(subs['Media'], function (media, index) {
				returnValue['media'].push( JSON.decode(this.options.jsonMap['media'].substitute(media)) );

				if (media['Part'][0] == undefined) {
					returnValue['media'][index]['files'].push(media['Part']['@file']);
				}
				else {
					Object.each(media['Part'], function (part) {
						returnValue['media'][index]['files'].push(part['@file']);
					});
				}
			}.bind(this));
		}

		return returnValue;
	},

	mapShowResult: function(subs) {

		var returnValue = JSON.decode(this.options.jsonMap.show.substitute(subs));
		return returnValue;
	},

	mapSectionsResult: function(subs) {

		var returnValue = JSON.decode(this.options.jsonMap.sections.substitute(subs));
		return returnValue;
	},

	getTheTVDB: function(guid) {
        return (guid.match(/\d+/g))[0];
    },

    getIMDB: function(guid) {
        return 'tt' + (guid.match(/\d+/g))[0];
    },

    toArray: function(obj) {
    	if (obj[0] == undefined) {
    		returnValue = new Array();
    		returnValue.push(obj);
    	}
    	else {
    		returnValue = obj;
    	}

    	return returnValue;
    }

});
