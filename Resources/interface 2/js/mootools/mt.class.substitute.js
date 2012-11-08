var Substitute = new Class({

    Implements: [Options, Debug],

	options: {
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
                if (this.options.substitute[key]) {
                    
                    if (this.options.substitute[key][0] == undefined) {
                        result = this.options.substitute[key]['@tag'];
                    }
                    else {
                        this.options.substitute[key].each(function(item, index) {
                            result += item['@tag'];
                            
                            console.log(item['@tag']);
                            
                            if (index < this.options.substitute[key].length-1) {
                                result += delimeter;
                            }
                        });
                    }
                }
                
                return result;
            },

            objectToAttribute: function(args) { // one argument: object
                if (args.length < 1) return '';
                var object = JSON.decode(args[0]);

                var result = '';
                Object.each(object, function(item, key) {
                    result += key + '="' + item + '" ';
                });

                return result;

            },

            escape: function(args) {
                if (args.length < 1) return '';
                return escape(args[0]);
            }
        }
	},

	substitute: function(obj) {
		return this.substituteWith(obj, this.options.substitute);
	},

    substituteWith: function(obj, substitute) {
        var tmp = this.simpleSubstituteWith(obj, substitute);
        this.log('[SUBSTITUTE:FUNCTION] with ' + JSON.encode(this.options.functions), REX_DEBUG);
        tmp = tmp.substituteFunction(this.options.functions);
        tmp = tmp.substituteFunction(this.options.functions); // twice to account for stacking
        this.log('[SUBSTITUTE] ' + tmp, REX_DEBUG);
        return tmp;
    },

    simpleSubstitute: function(obj) {
        return this.simpleSubstituteWith(obj, this.options.substitute);
    },

    simpleSubstituteWith: function(obj, substitute) {
        this.log('[SUBSTITUTE] "' + obj +  '" with ' + JSON.encode(substitute), REX_DEBUG);
        var result = obj.substitute(substitute, /\\?\{([^{}#]+)\}/g);
        this.log('[SUBSTITUTE][STRING] ' + result);
        return result;
    }
})