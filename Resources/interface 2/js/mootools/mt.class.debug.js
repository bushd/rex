var Debug = new Class({
	
	initialize: function(){},

	log: function(msg, mode) {
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
	},								

	error: function(msg) {
    	this.log(msg, REX_ERROR);
    }
});