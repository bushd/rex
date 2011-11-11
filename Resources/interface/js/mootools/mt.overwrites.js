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

String.implement({

	substituteFunction: function(object, regexp) {
		return this.replace(regexp || (/{#([^{}#]+)}/g), function(match, name){
			if (match.charAt(0) == '\\') return match.slice(1);
            var arr = name.split('::');
            var func = arr[0];
            var params = arr.slice(1);
			var result = (object[func] != null) ? object[func](params) : '';
            return result;
		});
	}

});

Asset.stylesheet = function(path,options) {

    options = options || {};
    options.href = path;
    options.type = 'text/css';
    options.rel = 'stylesheet';

    var maxAttempts = 100;
    if(options.maxAttempts != null) {
      maxAttempts = options.maxAttempts;
      delete options.maxAttempts;
    }

    this.id = options.id;
    if(!this.id) {
      this.id = options.id = 'Asset.stylesheet-'+(new Date().getTime());
    }
    this.element = new Element('link',options).inject(document.getElementsByTagName('head')[0]);
    var onload = options.onload || function() { };
    var onerror = options.onerror || function() { };


    var delay = 100, counter = 0;
    this.checker = (function() {
      clearInterval(this.timer);

      var sheets = document.styleSheets;
      for(var i=0;i<sheets.length;i++) {
        var file = sheets[i];
        var owner = file.ownerNode ? file.ownerNode : file.owningElement;
        if(owner && owner.id == this.id) {
          onload();
          return;
        }
        counter++;
        if(counter >= maxAttempts) {
          onerror();
        }
      }

      this.timer = this.checker.delay(delay,this);
    }.bind(this));
    this.timer = this.checker.delay(1,this);
  }
  
Array.add = function(arr, item){
    if (arr == null)  arr = [];
	if (item == null) return arr;
    arr.push(item);
    return arr;
};