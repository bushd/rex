if ( typeof(reX) == 'undefined' ) rex = reX = function() {};

// check for Player
try{
    Player
}catch(e) {
    Player = {};
};

reX.version = '0.4alpha';
reX.debugmode = true;
reX.infomode = true;

reX.state = {
	title: 'reX - a Plex Client',       // section title
	subtitle: '',                       // section subtitle
	section: {                         
		key: undefined,                 // section key
        url: undefined,                 // ajax url
        type: 'all',
		resources: {
			css: [],             // list of loaded css files    
            js: undefined               // list of loaded js files
		},
        json: undefined,                // current section manager json
        selectionIndex: undefined,
        history: undefined,             // last reX.section
        show: undefined,               // series we are in (if any)
        tvdb: undefined,
        imdb: undefined,
        season: undefined
	},
	events: {},                         // current set temp events
	controls: undefined,                // ??
    video: false                        // is there a video playing and should it be stopped when going back?
};

REX_FATAL  = 0
REX_ERROR  = 1
REX_WARN   = 2
REX_NOTICE = 3
REX_DEBUG  = 4
REX_LOG    = 5
REX_INFO   = 6

window.fireEvent('reXready');

// sorting

function sortBy(field, primer){

   return function(a,b){

       a = a[field];
       b = b[field];

       if (typeof(primer) != 'undefined'){
           a = primer(a);
           b = primer(b);
       }

       if (a<b) { return -1; }
       if (a>b) { return 1; }
       return 0;
	}
}

function sortByAfter(by, after, primerBy, primerAfter){
	
	return function(a,b){

		var a1 = a[after];
		var b1 = b[after];

		if (typeof(primerAfter) != 'undefined'){
			a1 = primerAfter(a1);
			b1 = primerAfter(b1);
		}

		if (a1 < b1) return -1;
		else if (a1 > b1) return 1;
		else {

			var a2 = a[by];
			var b2 = b[by];

			if (typeof(primerBy) != 'undefined'){
				a2 = primerBy(a2);
				b2 = primerBy(b2);
			}

			if (a2 < b2) return -1;
			if (a2 > b2) return 1;
			return 0;
		}
	}
}

// utility

function getRandom( min, max ) {
	if( min > max ) {
		return( -1 );
	}
	if( min == max ) {
		return( min );
	}
 
    return( min + parseInt( Math.random() * ( max-min+1 ) ) );
}

function stringToBoolean(string) {
    switch(string.toLowerCase()) {
        case "true": 
        case "yes": 
        case "1": 
            return true;
            break;
            
        case "false": 
        case "no": 
        case "0": 
        case null: 
            return false;
            break;
        
        default: 
            return Boolean(string);
    }
}

// localization

function L10N(string) {
	return Locale.get('reX.'+string);
}

function l10n(string) {
	return Locale.get('reX.'+string);
}

function localize(string) {
	return Locale.get('reX.'+string);
}

// Laod Request
Request.Load = new Class({
	Extends: Request.HTML,
    method: 'get',
    evalScripts: false,
    onRequest: function() {
        reX.debug('[REQUEST] load url '+ reX.state.section.url, REX_DEBUG);
    },
    onSuccess: function(responseTree, responseElements, responseHTML, responseJavaScript) {
        reX.debug('[SUCCESS] loaded url '+ reX.state.section.url, REX_INFO);
    	$('inner').set('html', responseHTML);
    }
});

// helper function for a request
reX.load = function (url, key, type) {
	reX.debug('[LOAD] url ' + url + ' with key ' + key, REX_INFO);
    
    // unset current page settinge
	reX.ResourceManager.unsetCSS();
    reX.ResourceManager.unsetJS();
    window.removeEvents(reX.state.events);
    reX.state.events = {};
    
    // unset custom html
    $('inner').set('html', '');
	$$('nav').set('html', '');
    
    reX.state.section.history = Object.clone(reX.state.section);
    reX.state.section.url = url;
    reX.state.section.key = key;
    reX.state.section.selectionIndex = undefined;
    
    if (type) {
        reX.state.section.type = type;
    }
    else {
        reX.state.section.type = 'all';
    }
	
    // load page
    var request = new Request.Load({
        url: reX.state.section.url
    }).send();
}

// helper function for a request
reX.back = function () {
	
    // unset current page settinge
	reX.ResourceManager.unsetCSS();
    reX.ResourceManager.unsetJS();
    window.removeEvents(reX.state.events);
    reX.state.events = {};
    
    // unset custom html
    $('inner').set('html', '');
	$$('nav').set('html', '');
    
    // get last seen page
    reX.state.section = Object.clone(reX.state.section.history);
    
    reX.debug('[BACK] url ' + reX.state.section.url + ' with key ' + reX.state.section.key, REX_INFO);

    
    if (reX.state.section.json != undefined && reX.state.section.json.length == 1) {
        reX.state.section = Object.clone(reX.state.section.history);
    }
	
    // load page
    var request = new Request.Load({
        url: reX.state.section.url
    }).send();
}

reX.ResourceManager = {
	
	setCSS: function(files, onLoad) {
        count = 0;
    
		Object.each(files, function(file, key) {
            reX.debug('[LOAD] css ' + file + ' with key ' + key, REX_INFO);
            Asset.stylesheet(file, {id: 'resource_'+key, onload: function(){++count;} });
		});
		
		reX.state.section.resources.css = files;
	},
	
	unsetCSS: function() {
		Object.each(reX.state.section.resources.css, function(file, key) {
            reX.debug('[UNLOAD] css ' + file + ' with key ' + key, REX_INFO);
			$('resource_'+key).destroy();
		});
		
		reX.state.section.resources.css = [];
	},
    
    setJS: function(files) {
		Object.each(files, function(file, key) {
            reX.debug('[LOAD] js ' + file + ' with key ' + key, REX_INFO);
			Asset.javascript(file, {id: 'js_resource_'+key});
		});
		
		reX.state.section.resources.js = files;
	},
	
	unsetJS: function() {
		Object.each(reX.state.section.resources.js, function(file, key) {
            reX.debug('[UNLOAD] js ' + file + ' with key ' + key, REX_INFO);
			$('js_resource_'+key).destroy();
		});
		
		reX.state.section.resources.js = undefined;
	}
};

reX.debug = function(msg, mode) {
    if (mode == undefined) { mode = REX_LOG }
    
    switch (mode) {
        
        default:
        case REX_LOG:
            console.log('[LOG]' + msg);
            break;
        
        case REX_DEBUG:
            if (reX.debugmode) {
                console.log('[DEBUG]' + msg);                
            }
            break;
            
        case REX_ERROR:
            console.error('[ERROR]' + msg);
            break;
            
        case REX_WARN:
            console.warn('[WARNING]' + msg);
            break;
        
        case REX_INFO:
            if (reX.debugmode || reX.infomode) {
                console.log('[INFO]' + msg);
            }
            break;
            
        case REX_FATAL:
            console.error('[FATAL]' + msg);
            break;
        
        case REX_NOTICE:
            console.log('[NOTICE]' + msg);
            break;
    }
    
};

reX.error = function(msg) {
    reX.debug(msg, REX_ERROR);
};