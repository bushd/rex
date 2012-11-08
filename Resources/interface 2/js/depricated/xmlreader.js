/*
---
name:		 XMLReader
description: Provides an easy way to read XML files while converting it's content to an Object.

license: MIT-style

authors:
- Ciul

requires:
- core/1.3	: *

provides: [XMLRequest, XML2Object]

...
*/

/*********************************** XML to Object Converter **********************************/

var XML2Object = new Class({
	
	Implements: Events,
	/*	Events:
		complete: $empty,
	*/
	
	/* Global variables */
	xml: null,
	text: null,
	xmlObj: {},
	xmlurl: null,
	root: null,
	
	/* Initialize */
	initialize: function(xmlurl) {
		xmlurl = (xmlurl != undefined && typeOf(xmlurl) == 'string')? xmlurl : '';
		if(!xmlurl.contains('xml','.')) {
			xmlurl = xmlurl + '.xml';
		}
		this.xmlurl = xmlurl;
		var xmlRequest = new XMLRequest(xmlurl).addEvent('success', function(text, xml) {
			this.text = text;
			this.xml = xml;
			this.root = this.get_rootNode();
			this.xmlObj = this._recursive_traverse(this.root);
			//console.log('...');
			//console.log(this.xmlObj);
			this.complete();
		}.bind(this)).send();
	},
	
	/********************** XML OBJECT methods **********************/
	_recursive_traverse: function(node) {
		
		var attributes = new Object();
		if(this.has_attributes(node)) {
			Array.each(this.get_attributes(node), function(attribute, index) {
				attributes[this.get_name(attribute)] = this.get_value(attribute);
			}, this);
		}
		
		var childNodes = new Array();
		if(this.has_childNodes(node)) {
			Array.each(this.get_childElements(node), function(child, index) {
				var childNode = this._recursive_traverse(child);
				childNodes.append([childNode]);
			}, this);
		}
		
		var obj = {
			name: this.get_name(node),
			value: '',
			attributes: attributes,
			childNodes: childNodes
		};
		
		return obj;
	},
	
	get_rootNode: function() {
		return this.xml.documentElement;
	},
	
	get_name: function(node) {
		var name = node.nodeName;
		return name;
	},
	
	get_value: function(node) {
		var value = node.nodeValue;
		return value;
	},
	
	get_type: function(node) {
		var type = node.nodeType;
		return type;
	},
	
	has_childNodes: function(node) {
		return (!!node.childNodes && node.childNodes.length != 0);
	},
	
	get_children: function(node) {
		if(this.has_childNodes(node)) {
			var children = node.childNodes;
			return children;
		} else return null;
	},
	
	get_childElements: function(node) {
		var chel = this.get_children(node);
		chel = this.filter_byType(chel, 1);
		return chel;
	},
	
	has_attributes: function(node) {
		return (!!node.attributes && node.attributes.length != 0);
	},
	
	get_attributes: function(node) {
		if(this.has_attributes(node)) {
			var attrs = node.attributes;
			return attrs;
		} else return null;
	},
	
	get_attribute: function(node, attribute) {
		if(this.has_attributes(node)) {
			var attrValue = node.getAttribute(attribute);
			return attrValue;
		} else return null;
	},
	
	collection_toArray: function(nodesCollection) {
		var nodesArray = [];
		Array.each(nodesCollection, function(node) {
			if(this.get_type(node) == 1) {
				nodesArray.append([node]);
			}
		}, this);
		return nodesArray;
	},
	
	filter_byType: function(nodes, type) {
		type = (type != undefined && typeOf(type) == 'number')? type : 1;
		var filteredNodes = this.xml.createElement('filteredNodes');
		for(i=0;i<nodes.length;i++) {
			if(nodes[i].nodeType == type) {
				var newNode = nodes[i].cloneNode(true);
				filteredNodes.appendChild(newNode);
			}
		}
		return filteredNodes.childNodes;
	},
	
	get_fromPath: function(source, path) {
		var parts = path.split('.');
		for (var i = 0, l = parts.length; i < l; i++){
			if (source.hasOwnProperty(parts[i])) {
				source = source[parts[i]];
			} else return null;
		}
		return source;
	},
	
	set_toPath: function(source, path, val) {
		var parts = key.split('.'),
			source2 = source; // so we can return the object
		for (var i = 0, l = parts.length; i < l; i++) {
			// So when the value does not exist (and is an own property) or is not an object
			if (i < (l - 1) && (!source.hasOwnProperty(parts[i]) || !Type.isObject(source[i]))){
				source[parts[i]] = {};
			}

			if (i == l - 1) source[parts[i]] = val;
			else source = source[parts[i]];
		}
		// Return the modified object
		return source2;
	},
	
	/********************** EVENTS **********************/
	complete: function() {
		var obj = {
			xmlObj: this.xmlObj,
			text: this.text,
			xml: this.xml
		};
		
		this.fireEvent('complete', obj);
	}
	
});

/*********************************** /XML to Object Converter **********************************/

/*********************************** XML Request Class **********************************/

var XMLRequest = new Class({
	
	Extends: Request,
	Implements: [Options, Events],
	
	// Options.
	options: {
		method: 'get',
		url: '',
		link: 'cancel',
		noCache: true
	},
	
	/* Initialize */
	initialize: function(xmlurl, options) {
		xmlurl = (xmlurl != undefined && typeOf(xmlurl) == 'string')? xmlurl : '';
		if(!xmlurl.contains('xml','.')) {
			xmlurl = xmlurl + '.xml';
		}
		this.setOptions(options);
		this.setOptions({ url: xmlurl });
		this.parent(options);
	}
	
});

/*********************************** /XML Request Class **********************************/