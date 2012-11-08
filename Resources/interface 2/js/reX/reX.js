if ( typeof(reX) == 'undefined' ) rex = reX = function() {};


reX.version = '0.4alpha';
reX.debugmode = false;
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
            js: undefined,              // list of loaded js files
            lessCSS: []
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
    	$('skin').set('html', responseHTML);
    }
});

// helper function for a request
reX.load = function (media, key, type) {
	reX.debug('[LOAD] media ' + media + ' with key ' + key, REX_INFO);
    
    // unset current page settinge
	resourceManager.unsetCSS();
    resourceManager.unsetJS();
    window.removeEvents(reX.state.events);
    reX.state.events = {};
    
    // unset custom html
    $('skin').set('html', '');
	$$('nav').set('html', '');
    
    switch (media) {
        case 'home':
            url = 'home.html';
            break;
        
        case 'video':
            url = 'video.html';
            break;
            
        default:
            url = 'media.html';
            break;
    }
    
    reX.state.section.history = Object.clone(reX.state.section);
    reX.debug('[LOAD] history set', REX_DEBUG);
    
    reX.state.section.url = url;
    reX.debug('[LOAD] url =' +url, REX_DEBUG);
    
    reX.state.section.key = key;
    reX.debug('[LOAD] key = '+key, REX_DEBUG);
    
    reX.state.section.selectionIndex = undefined;
    if (reX.state.section.key) {
        reX.debug('[LOAD] attempting to load skin', REX_DEBUG);
        reX.state.section.skin = skinManager.getCurrentSkinForSection(reX.state.section.key, media);
    }

    
    if (type) {
        reX.state.section.type = type;
    }
    else {
        reX.state.section.type = 'all';
    }
    
    reX.debug('[LOAD] type='+reX.state.section.type, REX_DEBUG);
    
    if (reX.state.section.skin && reX.state.section.skin.javascript) {
        reX.debug('[LOAD] loading JavaScript ...', REX_DEBUG);
        resourceManager.setJS( reX.state.section.skin.javascript.split(',') , function() {
            // load page
            var request = new Request.Load({
                url: reX.state.section.url
            }).send();
        });
    } 
    else {
        var request = new Request.Load({
            url: reX.state.section.url
        }).send();
    }
}

// helper function for a request
reX.back = function () {
	
    // unset current page settinge
	resourceManager.unsetCSS();
    resourceManager.unsetJS();
    window.removeEvents(reX.state.events);
    reX.state.events = {};
    
    // unset custom html
    $('skin').set('html', '');
	$$('nav').set('html', '');
    
    // get last seen page
    reX.state.section = Object.clone(reX.state.section.history);
    
    reX.debug('[BACK] url ' + reX.state.section.url + ' with key ' + reX.state.section.key, REX_INFO);

    
    if (reX.state.section.json != undefined && reX.state.section.json.length == 1) {
        reX.state.section = Object.clone(reX.state.section.history);
    }
	
    if (reX.state.section.skin && reX.state.section.skin.javascript) {
        resourceManager.setJS( reX.state.section.skin.javascript.split(',') , function() {
            // load page
            var request = new Request.Load({
                url: reX.state.section.url
            }).send();
        });
    } 
    else {
        var request = new Request.Load({
            url: reX.state.section.url
        }).send();
    }
}

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