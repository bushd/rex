

// Create scope limiter
(function(scope) {
    
    scope.Template = new Class({
        
        Implements: [Options, Debug, Substitute],
        
        initialize: function(options) {
            this.setOptions(options);
            this.loadTemplate();
            
            self = this;
        },
            
        parse: function() {
            var options = this.options;
        
            // does a template exist
            if (!options.template && !options.templateURL) {
                return false;
            }
        
            // get template if needed
            this.loadTemplate();
            
            if (!options.template) { 
                return false;
            }
            
            this.preSubstitute();
            
            // substitute
            tmp = this.render();
            
            var template = Elements.from(tmp, false);
            
            // insert sub-templates
        
            this.preInject();
        
            // add templatze to DOM
            if (options.update) {
                //console.log(options.update);
                document.id(options.update).empty().adopt(template);
            }
            else if (options.append) {
                //console.log(options.append);
                document.id(options.append).adopt(template);
            }

            this.postInject();

            this.log('[TEMPLATE][SUCCESS]', REX_INFO);

            return true;
            
        },
        
        loadTemplate: function() {
            var options = this.options;
            
            if (!options.template && !options.templateURL) { 
                // DO NOTHING
            }
            else if (!options.template) {
                new Request({
                    async: false,
                    url: this.options.templateURL,
                    evalScripts: true,
                    onRequest: function() {
                        this.log('[TEMPLATE][REQUEST] attempt to load template from '+options.templateURL, REX_DEBUG);
                    }.bind(this),
                    onSuccess: function(template) {
                        this.log('[TEMPLATE][SUCCESS] template loaded from '+options.templateURL, REX_INFO);
                        this.log('[TEMPLATE][SUCCESS] '+template, REX_DEBUG);
                        options.template = template;
                    }.bind(this),
                    onFailure: function(xhr) {
                        this.log('[TEMPLATE][FAILURE] attempt to laod template from '+options.templateURL, REX_ERROR);
                        this.log('[XHR:FAILURE] '+JSON.encode(xhr), REX_DEBUG);
                    }.bind(this)
                }).send();
            }
        },
        
        getTemplate: function() {
            return this.options.template;
        },
        
        preSubstitute: function() {
            this.log('[TEMPLATE] preSubstitute', REX_INFO);
        },
        
        preInject: function() {
            this.log('[TEMPLATE] preInject', REX_INFO);
        },
        
        postInject: function() {
            this.log('[TEMPLATE] postInject', REX_INFO);
        },
        
        render: function() {
            return this.substitute(this.options.template);
        },

        options: {
            templateURL: undefined,
            template: undefined,
            update: null,
            append: null
        }
    });

})(this);