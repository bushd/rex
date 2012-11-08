if ( typeof(reX) == 'undefined' ) reX = function() {};

reX.Controls = new Class({

	Implements: [Events, Options, Publisher, Debug],

	initialize: function(options) {

		this.setOptions(options);

		this.registerPublisher('reX.Controls');
						
		if(this.options.index != undefined) {
				
			//$$('[index="'+options.index+'"]').addClass('focus');
			
			// listen to keydown events
			window.addEvent('keydown', function(event) {
				if(event.key == 'left') { //left key
					event.stop();
					this.changeSelection('left', 'pressedLeft');
				}
				else if(event.key == 'up') { //up
					event.stop();
					this.changeSelection('up', 'pressedUp');
				}
				else if(event.key == 'right') { //right
					event.stop();
					this.changeSelection('right', 'pressedRight');
				}
				else if(event.key == 'down') { //down
					event.stop();
                    this.changeSelection('down', 'pressedDown');
				}
				else if(event.key == 'enter') { //enter
					event.stop();
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
                else if(event.key == 'i') { //i
					event.stop();
					window.fireEvent('infoKeyPressed');
				}
			}.bind(this));
		}
	},
	
	select: function(index) {
        reX.debug('[CONTROLS] select index '+index, REX_DEBUG);
		$$('.focus').removeClass('focus');
		var elements = $$('[data-index="'+index+'"]');
        reX.debug('[CONTROLS] select Elements '+elements, REX_DEBUG);
        elements.addClass('focus').fireEvent('focus');	
		window.fireEvent('selectionChange', $$('.focus'));
	},
	
	getSelection: function() {
		return $$('.' + this.options.focusClass);
	},
	
	getSelectedIndex: function() {
		return this.getSelectedItem().getProperty('data-index');
	},
    
    getSelectedItem: function() {
		return this.getSelection()[0];
	},

	getIndex: function(index) {
		return $$('[data-index="' + index + '"]');
	},

	switchFocus: function(index) {
		var focus = this.options.focusClass;

		var oldFocus = this.getSelection();
		oldFocus.removeClass(focus);

		var newFocus = $$('[data-index="'+index+'"]');
		newFocus.addClass(focus);
		newFocus = this.getSelection();
		newFocus.fireEvent('focus');	

		this.log('[CONTROLS] old Focus: '); console.log(oldFocus);
		this.log('[CONTROLS] new Focus: '); console.log(newFocus);

		return {'old': oldFocus, 'new': newFocus};
	},

	getNextIndex: function(direction) {
		// get next index from current selection
		var currentFocus = this.getSelection();
		var nindex = currentFocus.getProperty('data-index-' + direction)[0];

		if(typeOf(nindex) == 'null') {
			//get one level up
			currentFocus.getParents('.hasSelectable').each(function(item) {			
				nindex = item.getProperty('data-index-' + direction)[0];
			
				if(typeOf(nindex) == 'string') {
					return [nindex, true];
				}
			});
		}
				
		if(typeOf(nindex) == 'string') {
			return [nindex, false];
		}
	},

	changeSelection: function(direction, eventName) {
		var tmpResult = this.getNextIndex(direction);
		var nextIndex = tmpResult[0];
		var leftElementLevel = tmpResult[1];

		this.log('[CONTROLS] changeSelection: ' + direction);

		if(typeof(nextIndex) != 'undefined') {
			if(leftElementLevel) {
				this.log('[CONTROLS] we left Element level');
				window.fireEvent('leaveElement');
                this.informListeners('leaveElement', item);
				return;
			}
			else {
				this.log('[CONTROLS] next Index: ' + nextIndex);
				var elements = this.switchFocus(nextIndex);

            	window.fireEvent('selectionLeave', elements['old']);
				elements['old'].removeClass(this.options.focusClass);
			
				window.fireEvent('selectionChange', elements['new']);
				window.fireEvent(eventName, elements['old']);
				this.informListeners('selectionChange', elements['new']);
				this.informListeners(eventName, {'old': elements['old'], 'new': elements['new'] });
		
			}
		}
		else {
            window.fireEvent(eventName);
            this.informListeners(eventName);
        }
	},
	
	options: {
		index: 1,
		focusClass: 'focus',
	}
});