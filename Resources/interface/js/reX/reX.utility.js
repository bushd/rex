Utility = reX.Utility = {

    getSkins: function() {
        return js2objcBridge.getSkins();
    },
    
    setFrame: function() {
        js2objcBridge.setFrame();
    },
    
    setRefreshRate: function(rate) {
        js2objcBridge.setRefreshRate(rate);
    }
}