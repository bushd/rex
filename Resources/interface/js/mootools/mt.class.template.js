

// Create scope limiter
(function(scope) {
    
    scope.Template = new Class({
    
        options: {
            templateURL: undefined,
            template: undefined,
            update: null,
            append: null,
            substitute: {},
            functions: {
                transcode: function(arg) { // one paramenter
                    if (!arg) return '';
                    
                    if (arg.length >= 3)
                        return mediaManager.transcodeImage(arg[0], arg[1], arg[2]);
                    else 
                        return mediaManager.transcodeImage(arg[0]);
                },
                
                ifthenelse: function(args) { // three parameters
                    if (args.length < 2) return '';
                    
                    var ifArgument = stringToBoolean(args[0]);
                    var thenArgument = args[1];
                    
                    var elseArgument = '';
                    if (args.length > 2) {
                        elseArgument = args[2];
                    }
                    
                    return (ifArgument ? thenArgument : elseArgument); 
                },
                
                exists: function(arg) {
                    return ((arg && arg[0] !== "") ? 'true' : 'false');
                },
                
                notexists: function(arg) {
                    return ((arg && arg[0] !== "") ? 'false' : 'true');
                },
                
                equals: function(args) { // two parameters
                    if (args.length < 2) return 'false';
               
                    var firstArgument = args[0];
                    var secondArgument = args[1];
               
                    return ((firstArgument == secondArgument) ? 'true' : 'false'); 
               },
               
               notequals: function(args) { // two parameters
                    if (args.length < 2) return 'false';
               
                    var firstArgument = args[0];
                    var secondArgument = args[1];
               
                    return ((firstArgument != secondArgument) ? 'true' : 'false'); 
               },
               
               not: function(arg) { // one parameter
                    if (!arg) return 'false';
               
                    return (stringToBoolean(arg[0]) ? 'false' : 'true');
               },
               
               toTime: function(arg) {
                    if (!arg) return '';
                    
                    var time = arg[0];
                    var seconds = parseInt((time/1000)%60);
                    var minutes = parseInt((time/(1000*60))%60);
                    var hours = parseInt((time/(1000*60*60))%24);
                    
                    seconds = seconds.toString();
                    minutes = minutes.toString();
                    
                    return hours + ':' + ((minutes.length) < 2 ? '0'+minutes : minutes) + ':' + ((seconds.length) < 2 ? '0'+seconds : seconds);
               },
               
               implode: function(args) { // two parameters
                    if (args.length < 1) return '';
               
                    var key = args[0];
                    var delimeter;               
               
                    if (!args[1]) {
                        delimeter = ', ';
                    }
                    else {
                        delimeter = args[1];
                    }
                                        
                    var result = '';
                    if (self.options.substitute[key]) {
                        
                        if (self.options.substitute[key][0] == undefined) {
                            result = self.options.substitute[key]['@tag'];
                        }
                        else {
                            self.options.substitute[key].each(function(item, index) {
                                result += item['@tag'];
                                
                                console.log(item['@tag']);
                                
                                if (index < self.options.substitute[key].length-1) {
                                    result += delimeter;
                                }
                            });
                        }
                    }
                    
                    return result;
               }
            }
        },
        
        Implements: Options,
        
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
                console.log(options.update);
                document.id(options.update).empty().adopt(template);
            }
            else if (options.append) {
                console.log(options.append);
                document.id(options.append).adopt(template);
            }

            this.postInject();

            reX.debug('[TEMPLATE][SUCCESS]', REX_INFO);

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
        },
        
        render: function() {
            reX.debug('[TEMPLATE][SUBSTITUTE] with ' + JSON.encode(this.options.substitute), REX_DEBUG);
            tmp = this.options.template.substitute(this.options.substitute, /\\?\{([^{}#]+)\}/g);
            console.log(tmp);
            reX.debug('[TEMPLATE][SUBSTITUTE:FUNCTION] with ' + JSON.encode(this.options.functions), REX_DEBUG);
            tmp = tmp.substituteFunction(this.options.functions);
            tmp = tmp.substituteFunction(this.options.functions); // twice to account for stacking
            reX.debug('[TEMPLATE][SUBSTITUTE] ' + tmp, REX_DEBUG);
            return tmp;
        },
        
        self: undefined
    });

})(this);