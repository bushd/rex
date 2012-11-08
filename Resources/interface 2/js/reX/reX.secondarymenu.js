reX.SecondaryMenu = new Singleton({

	Extends: Template,
    
    Implements: Options,
    
    initialize: function() {   
        this.parent();     
        
        this.loadTemplate();
        
        $('secondary').inject(this.options.template);
    },
    
    set: function(entries) {
        var secondary = new reX.Menu({
            template = '{entry}';
        });
        
    },
    
    show: function() {
        this.state.focus = $$('.focus');
        this.state.focus.removeClass('focus');
        $('secondary li[index="1"]').addClass('focus');
        $('secondary').show();
    },
    
    hide: function() {
        $('secondary').hide();
        $$('.focus').removeClass('focus');
        this.state.focus.addClass('focus');
    },
    
    state: {
        focus: undefined
    }

});