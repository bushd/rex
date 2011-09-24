Request.implement({
	isSuccess: function(){
		var status = this.status;
		return (status == 0 || status >= 200 && status < 300);
	}
});

Asset.css = function(source, properties){
	properties = properties || {};
	var onload = properties.onload || properties.onLoad;
	if (onload){
		properties.events = properties.events || {};
		properties.events.load = onload;
		delete properties.onload;
		delete properties.onLoad;
	}
	return new Element('link', Object.merge({
		rel: 'stylesheet',
		href: source,
		type: 'text/css'
	}, properties)).inject(document.head);
};

