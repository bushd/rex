reX.json2html = new Class({

	Implements: [Options],

	initialize: function(options) {
		this.setOptions(options);
	},		

	convert: function(list) {
		var result = new Array();
			
		if(typeOf(list) == 'array')	{
			list.each(function(item){
				var str = '' + this.options.html;
				
				if(this.options.unescape) {
					result.push(unescape(str.substitute(item)));
				}
				else {
					result.push(str.substitute(item));
				}
			}.bind(this));	
		}				
		else {
			var str = '' + this.options.html;

			result.push(str.substitute(list));
		}
		
		return result;
	},
	
	options: {
		html: '<div>{@title}</div>',
		unescape: false
	}
	
});