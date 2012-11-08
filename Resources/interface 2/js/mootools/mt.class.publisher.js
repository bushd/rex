var Publisher = new Class({

    publisherName: 'PublisherStub',

    registerPublisher: function(name) {
        this.publisherName = name;

        return MessageCenter.registerPublisher(this.publisherName);
    },

    informListeners: function(message, data) {
        MessageCenter.inform(this.publisherName, message, data);
    }

});