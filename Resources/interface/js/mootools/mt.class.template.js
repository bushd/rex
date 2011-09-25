

// Create scope limiter
(function(scope) {
    
    scope.Template = new Class({
    
        options: {
            templateURL: undefined,
            template: undefined,
            update: null,
            append: null,
            substitute: {}
        },
        
        Implements: Options,
        
        initialize: function(options) {
            this.setOptions(options);
            
            this.loadTemplate();
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
            reX.debug('[TEMPLATE][SUBSTITUTE] with ' + JSON.encode(options.substitute), REX_DEBUG);
            tmp = options.template.substitute(options.substitute);
            reX.debug('[TEMPLATE][SUBSTITUTE] ' + tmp, REX_DEBUG);
            
            var template = Elements.from(tmp, false);
            
            // insert sub-templates
        
            this.preInject();
        
            // add templatze to DOM
            if (options.update) {
                document.id(options.update).empty().adopt(template);
            }
            else if (options.append) {
                document.id(options.append).adopt(template);
            }

            this.postInject();

            reX.debug('[TEMPLATE][SUCCESS]', REX_INFO);

            return true;
            
        },
        
        loadTemplate: function() {
            var options = this.options;
            
             if (!options.template) {
                new Request({
                    async: false,
                    url: this.options.templateURL,
                    evalScripts: true,
                    onRequest: function() {
                        reX.debug('[TEMPLATE][REQUEST] attempt to load template from '+options.templateURL, REX_DEBUG);
                    },
                    onSuccess: function(template) {
                        reX.debug('[TEMPLATE][SUCCESS] template loaded from '+options.templateURL, REX_INFO);
                        reX.debug('[TEMPLATE][SUCCESS] '+template, REX_DEBUG);
                        options.template = template;
                    },
                    onFailure: function(xhr) {
                        reX.debug('[TEMPLATE][FAILURE] attempt to laod template from '+options.templateURL, REX_ERROR);
                        reX.debug('[XHR:FAILURE] '+JSON.encode(xhr), REX_DEBUG);
                    }
                }).send();
            }
        },
        
        getTemplate: function() {
            return this.options.template;
        },
        
        preSubstitute: function() {
            reX.debug('[TEMPLATE] preSubstitute', REX_INFO);
        },
        
        preInject: function() {
            reX.debug('[TEMPLATE] preInject', REX_INFO);
        },
        
        postInject: function() {
            reX.debug('[TEMPLATE] postInject', REX_INFO);
        }
        
    });

})(this);