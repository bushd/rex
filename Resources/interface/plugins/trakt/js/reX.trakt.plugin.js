if ( typeof(trakt) == 'undefined' ) trakt = function() {};

trakt.version = '0.3 alpha';
trakt.build = '10.4.2011'
trakt.api = '75bf1239f70968c99b8189b21a0f23206f8ed673';

trakt.user = 'bushd';
trakt.password = "8cfe85b52443c1e288795ebd10652b12a146a131";


// TRAKT Request
Request.TRAKT = new Class({
	Extends: Request.JSON,
    method: 'post'
});

// helper function for a request
trakt.get = function (url, fn) {    
    var request = new Request.TRAKT({
        url: url,
        onSuccess: function(json){
                fn(json);
        },
        onFailure: function(msg) {
            reX.debug('uhoh! Something went wrong. ' + msg, REX_ERROR);
        }
    }).send();
}

// helper function for a request with Login
trakt.post = function (url, fn, parameters) {
    if(parameters == 'undefined') {
        parameters = {};
    }
    
    Object.append(
        parameters, 
        {
            "username": trakt.user, 
            "password": trakt.password
        }
    );
    
    var request = new Request.TRAKT({
        url: url,
        onSuccess: function(json){
                fn(json);
            }
    }).send(JSON.encode(parameters));
}

/* CALENDARS */

trakt.getUserCalendar = function(fn) {
    trakt.post(
        'http://api.trakt.tv/user/calendar/shows.json/'+trakt.api+'/'+trakt.user,
        fn
    );
};

trakt.getCalendar = function(fn) {
    trakt.get(
        'http://api.trakt.tv/calendar/shows.json/'+trakt.api,
        fn
    );
};

trakt.getPremiers = function(fn) {
		var request = new Request.JSON({
			url: 'http://api.trakt.tv/calendar/premiers.json/'+trakt.api,
			method: 'post',
			onSuccess: function(json){
					fn(json);
				}
		}).send();
};

/* RATING */

trakt.rateMovie = function(title, year, rating) {
	var request = new Request.JSON({
		url: 'http://api.trakt.tv/rate/movie/'+trakt.api,
		method: 'post',
		onSuccess: function(json){
				fn(json);
			}
	}).send(JSON.encode({ "username": trakt.user, 
					      "password": trakt.password,
						  "title": title,
						  "year": year,
						  "rating": rating}));
}

trakt.rateEpisode = function(show, season, episode, year, rating) {
	var request = new Request.JSON({
		url: 'http://api.trakt.tv/rate/episode/'+trakt.api,
		method: 'post',
		onSuccess: function(json){
				fn(json);
			}
	}).send(JSON.encode({ "username": trakt.user, 
					      "password": trakt.password,
						  "title": show,
						  "season": season,
						  "episode": episode,
						  "year": year,
						  "rating": rating}));
}

trakt.rateShow = function(show, year, rating) {
	var request = new Request.JSON({
		url: 'http://api.trakt.tv/rate/show/'+trakt.api,
		method: 'post',
		onSuccess: function(json){
				fn(json);
			}
	}).send(JSON.encode({ "username": trakt.user, 
					      "password": trakt.password,
						  "title": show,
						  "year": year,
						  "rating": rating}));
}

/* MOVIE SCROBBLING */

trakt.beginMovieScrobbling = function(title, year, duration, progress, callback) {
	var request = new Request.JSON({
		url: 'http://api.trakt.tv/movie/watching/'+trakt.api,
		method: 'post',
		onSuccess: function(json){
				callback(json);
			}
	}).send(JSON.encode({ "username": trakt.user, 
					      "password": trakt.password,
						  "title": title,
						  "year": year,
						  "duration": (duration/60000),
						  "porgress": progress,
						  "plugin_version": trakt.version,
						  "media_center_version": "0.1 alpha",
						  "media_center_date": trakt.build}));
}

trakt.endMovieScrobbling = function(title, year, duration, progress, callback) {
	var request = new Request.JSON({
		url: 'http://api.trakt.tv/movie/scrobble/'+trakt.api,
		method: 'post',
		onSuccess: function(json){
				callback(json);
			}
	}).send(JSON.encode({ "username": trakt.user, 
					      "password": trakt.password,
						  "title": title,
						  "year": year,
						  "duration": (duration/60000),
						  "porgress": progress,
						  "plugin_version": trakt.version,
						  "media_center_version": "0.1 alpha",
						  "media_center_date": trakt.build}));
}

trakt.beginShowScrobbling = function(title, year, season, episode, duration, progress, callback) {    
    var request = new Request.JSON({
		url: 'http://api.trakt.tv/show/watching/'+trakt.api,
		method: 'post',
		onSuccess: function(json){
				callback(json);
			},
		onRequest: function() {
			reX.debug('[TRAKT][REQUEST] scrobble show '+ title +' ('+ year + ') s'+season+'e'+episode+ ' @ ' + (duration*progress/100), REX_DEBUG);
			},
		onFailure: function(xhr) {
				reX.debug('[TRAKT][FAILURE] '+xhr.status+': unable to scrobble show', REX_ERROR);
			}
	}).send(JSON.encode({ "username": trakt.user, 
					      "password": trakt.password,
						  "title": title,
						  "season": season,
						  "episode": episode,
						  "year": year,
						  "duration": (duration/60000),
						  "porgress": progress,
						  "plugin_version": trakt.version,
						  "media_center_version": "0.1 alpha",
						  "media_center_date": trakt.build}));
}

trakt.endShowScrobbling = function(title, year, season, episode, duration, progress, callback) {
	var request = new Request.JSON({
		url: 'http://api.trakt.tv/show/scrobble/'+trakt.api,
		method: 'post',
		onSuccess: function(json){
				callback(json);
			},
		onRequest: function() {
				reX.debug('[TRAKT][REQUEST] scrobble show '+ title +' ('+ year + ') s'+season+'e'+episode+ ' @ ' + (duration*progress/100), REX_DEBUG);
			},
		onFailure: function(xhr) {
				reX.debug('[TRAKT][FAILURE] '+xhr.status+': unable to scrobble show', REX_ERROR);
			}
	}).send(JSON.encode({ "username": trakt.user, 
					      "password": trakt.password,
						  "title": title,
						  "season": season,
						  "episode": episode,
						  "year": year,
						  "duration": (duration/60000),
						  "porgress": progress,
						  "plugin_version": trakt.version,
						  "media_center_version": "0.1 alpha",
						  "media_center_date": trakt.build}));
}

trakt.cancelWatching = function(type, callback){
	var request = new Request.JSON({
		url: 'http://api.trakt.tv/'+type+'/cancelwatching/'+trakt.api,
		method: 'post',
		onSuccess: function(json){
				callback(json);
			}
	}).send(JSON.encode({ "username": trakt.user, 
					      "password": trakt.password}));
} 

/* WATCHLIST */

trakt.getWatchlist = function(type, callback) {
	var request = new Request.JSON({
		url: 'http://api.trakt.tv/user/watchlist/'+type+'s/'+trakt.api,
		method: 'post',
		onSuccess: function(json){
				callback(json);
			}
	}).send(JSON.encode({ "username": trakt.user, 
					      "password": trakt.password}));
}
