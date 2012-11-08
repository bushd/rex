var MessageCenter = new Singleton({

    Implements: [Options, Debug],

    // The UI template with attachpoints and attachevents
    options: {},

    queues: {},

    // The magical constructor
    initialize: function(options) {
        this.log("[MessageCenter]  Initialize");

        // Set the options
        this.setOptions(options);
    },

    queueExists: function(queue) {
        if(this.queues[queue]) return true;
        else return false;
    },

    registerPublisher: function(name) {
        if (!this.queueExists(name)) {
            this.log("[MessageCenter]  registering new Queue: " + name);
            this.queues[name] = [];
        }

        return this.queueExists(name);
    },

    registerListener: function(queue, listenerName, listenerObject) {
        if (!this.queueExists(queue)) {
            this.registerPublisher(queue);
        }

        if (instanceOf(listenerObject, Listener)) {
            this.log("[MessageCenter][adding] new Listener object: " + listenerName);
            this.queues[queue][listenerName] = listenerObject;
        }
        else if (typeof(listenerObject) == 'function') {
            this.log("[MessageCenter][adding] new Listener with function: " + listenerName);
            this.queues[queue][listenerName] = listenerObject;
        }
        else {
            this.log("[MessageCenter][Listener] not compatible " + listenerName);
            return false;
        }  
    },

    inform: function(queue, message, data) {
        this.log("[MessageCenter][MESSAGE] " + message);
        Object.each(this.queues[queue], function(listener, name) {

            if (instanceOf(listenerObject, Listener)) {
                this.log("[MessageCenter][INFORM] " + name);
                listener.inform(message, queue, data);
            }
            else if (typeof(listenerObject) == 'function') {
                this.log("[MessageCenter][CALL] " + name);
                listener(message, queue, data);
            }
        }.bind(this));
    }
});