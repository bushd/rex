Request.XML2JSON = new Class({

	Extends: Request,

	options: {
		headers: {
			Accept: 'application/xml, text/xml'
		},
        doProcess: function(json) {}
	},

	success: function(text, xml){
        reX.debug('[SUCCESS] in Request.XML2JSON', REX_DEBUG);
		var x2j = new XML.ObjTree();
		var json = x2j.parseXML(this.processScripts(text));
        		        
		//this.options.doProcess(json);
        this.onSuccess(json);
	},
    
    onFailure: function(xhr) {
        reX.debug('[FAILURE] in Request.XML2JSON', REX_WARN);
    },
    
    onRequest: function() {
        reX.debug('[REQUEST] in Request.XML2JSON', REX_DEBUG);
    },
    
    onTimeout: function() {
        reX.debug('[TIMEOUT] in Request.XML2JSON', REX_WARN);
    },
    
    onComplete: function() {
        reX.debug('[COMPLETED] Request.XML2JSON', REX_DEBUG);
    },

});