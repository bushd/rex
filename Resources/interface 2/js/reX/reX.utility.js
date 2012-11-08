Utility = reX.Utility = {

    getSkins: function() {
        reX.debug('[UTILITY] getSkins', REX_DEBUG);
        return js2objcBridge.getSkins();
    },
    
    setFrame: function() {
        js2objcBridge.setFrame();
    },
    
    setRefreshRate: function(rate) {
        reX.debug('[UTILITY] setRefreshRate:' + rate, REX_DEBUG);
        js2objcBridge.setRefreshRate(rate);
    }
};