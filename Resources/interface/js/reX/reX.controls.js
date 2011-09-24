if ( typeof(reX) == 'undefined' ) reX = function() {};

reX.Controls = new Class({

	Implements: [Events, Options],

	initialize: function(options) {
		this.setOptions(options);
						
		if(this.options.index != undefined) {
				
			//$$('[index="'+options.index+'"]').addClass('focus');
			
			window.addEvent('keydown', function(event) {
				if(event.key == 'left') { //left
					event.stop();
					
				
					var nindex = $$('.focus').getProperty('left');
			
					if(typeOf(nindex[0]) == 'null') {
						$$('.focus').getParents('.hasSelectable').each(function(item) {			
							nindex = item.getProperty('left');
						
							if(typeOf(nindex[0]) == 'string') {
								return;
							}
						});
					}
				
					if(typeOf(nindex[0]) == 'string') {
						var old = $$('.focus')
						old.removeClass('focus');
						$$('[index="'+nindex[0].toInt()+'"]').addClass('focus').fireEvent('focus');	
						window.fireEvent('selectionChange', $$('.focus'));
						window.fireEvent('pressedLeft', old);
					}
				}
				else if(event.key == 'up') { //up
					event.stop();
			
					var nindex = $$('.focus').getProperty('up');
	
					if(typeOf(nindex[0]) == 'null') {
						$$('.focus').getParents('.hasSelectable').each(function(item) {			
							nindex = item.getProperty('up');
						
							if(typeOf(nindex[0]) == 'string') {
								return;
							}
						});
					}
				
					if(typeOf(nindex[0]) == 'string') {
						var old = $$('.focus')
						old.removeClass('focus');
						$$('[index="'+nindex[0].toInt()+'"]').addClass('focus').fireEvent('focus');
						window.fireEvent('selectionChange', $$('.focus'));	
						window.fireEvent('pressedUp', old);
					}
				}
				else if(event.key == 'right') { //right
					event.stop();
			
					var nindex = $$('.focus').getProperty('right');
	
					if(typeOf(nindex[0]) == 'null') {
						$$('.focus').getParents('.hasSelectable').each(function(item) {			
							nindex = item.getProperty('right');
						
							if(typeOf(nindex[0]) == 'string') {
								return;
							}
						});
					}
				
					if(typeOf(nindex[0]) == 'string') {
						var old = $$('.focus')
						old.removeClass('focus');
						$$('[index="'+nindex[0].toInt()+'"]').addClass('focus').fireEvent('focus');	
						window.fireEvent('selectionChange', $$('.focus'));
						window.fireEvent('pressedRight', old);
					}
				}
				else if(event.key == 'down') { //down
					event.stop();
			
					var nindex = $$('.focus').getProperty('down');
	
					if(typeOf(nindex[0]) == 'null') {
						$$('.focus').getParents('.hasSelectable').each(function(item) {			
							nindex = item.getProperty('down');
						
							if(typeOf(nindex[0]) == 'string') {
								return;
							}
						});
					}
				
					if(typeOf(nindex[0]) == 'string') {
						var old = $$('.focus')
						old.removeClass('focus');
						$$('[index="'+nindex[0].toInt()+'"]').addClass('focus').fireEvent('focus');	
						window.fireEvent('selectionChange', $$('.focus'));
						window.fireEvent('pressedDown', old);	
					}
				}
				else if(event.key == 'enter') { //enter
					event.stop();
					$$('.focus')[0].fireEvent('click');
					window.fireEvent('selectionEnter', $$('.focus')[0]);	
				}
				else if(event.key == 'backspace') { //<-
					event.stop();
					window.fireEvent('pressedBack');		
				}
                else if(event.key == 'space') { //space
					event.stop();
					window.fireEvent('pressedSpace');
				}
				else if(event.key == 'm') { //m
					event.stop();
					window.fireEvent('calledMenu');		
				}
				else if(event.key == 'w') { //w
					event.stop();
					window.fireEvent('wPressed', $$('.focus')[0]);
				}
			});
		}
	},
	
	select: function(index) {
		$$('.focus').removeClass('focus');
		$$('[index="'+index.toInt()+'"]').addClass('focus').fireEvent('focus');	
		window.fireEvent('selectionChange', $$('.focus'));
	},
	
	getSelection: function() {
		return $$('.focus');
	},
	
	getSelectedIndex: function() {
		return parseInt($$('.focus')[0].getProperty('index'));
	},
	
	options: {
		index: 1
	}
});