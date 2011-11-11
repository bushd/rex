var xml2json = new Class({
	
	initialize: function(xml) {
		var json = '{}';
		
		var root = xml.documentElement;
		
		
		json = '{' + root.tagName+': ';
		
		var attr = this.getAttributes(root);
		
		json += '{' + attr;	
		
		this.getChildren(root);	
		
		
		for(var i = 0; i < root.childNodes.length; i++) { 
			
			//if(root.childNodes[i].tagName != undefined)
				//console.log(root.childNodes[i]);

			
			//var node = xml.childNodes[i];
			//var id = node.getAttribute('value'); // Get attribute value
			//var value = node.firstChild.nodeValue; // Get node value 
		}
		
		json += '}}';
		
		console.log(json);
		//return JSON.encode(json);
	},
	
	getAttributes: function(element) {
		var json = '';
		
		for(var i = 0; i < element.attributes.length; i++) {
			if(i > 0) json += ', ';
			
			json += element.attributes[i].name + ": '" + element.attributes[i].value + "'" 
		}
	
		return json;
	},
	
	getChildren: function(root) {
		var json = '';
		var arr = new Array();
 	
		if(root.childNodes.length > 0) {
			for(var i = 0; i < root.childNodes.length; i++) { 
			
				var child = root.childNodes[i];

				if(child.tagName != undefined) {
					if(typeOf(arr[child.tagName]) == typeOf(null)) {
						arr[child.tagName] = new Array();
					}
					
					var attr = this.getAttributes(root);
		
					if(arr[child.tagName].length >= 1) {
						json += ',';
					}
					json += '{' + attr;	

					var childs = this.getChildren(root);	
		
		
					for(var i = 0; i < childs.length; i++) { 
				
					}
			
					json += '}';
								
					//arr[child.tagName].append(json);
				}
			}
		}
		
		return json;
	}
});