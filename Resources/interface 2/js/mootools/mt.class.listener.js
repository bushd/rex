var Listener = new Class({

    inform: function(message, informer, data) {},

    registerListener: function(queue, listenerName) {
    	MessageCenter.registerListener(queue, listenerName, this);
    }

});