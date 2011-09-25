reX.SkinManager = new Class({
    
    initialize: function() {
        this.skins = this.getSkins().skins;
    },
    
    getSkins: function() {
        reX.debug('[SKINMANAGER] skin json: '+ JSON.encode(JSON.decode(Player.getSkins())), REX_DEBUG);
    
        return JSON.decode(Player.getSkins());
    },
    
    getCurrentSkinForSection: function(key, viewGroup) {
        var skinID;
        
        if(key) {
            reX.debug('[SKINMANAGER] load skin for key ' + key, REX_DEBUG);
            skinID = reX.preferences.skins[key];
        }
        
        // FALLBACK: get default for type
        if (!skinID) {
            reX.debug('[SKINMANAGER] no skin defined for key ' + key, REX_DEBUG);
            if (!viewGroup) {
                viewGroup = mediaManager.getSectionInformations().viewGroup;
                if (!viewGroup) {
                    viewGroup = reX.state.section.json[0]['@type'];
                }
                reX.debug('[SKINMANAGER] section is viewGroup ' + viewGroup, REX_DEBUG);
            }
            
            skinID = this.default[viewGroup];
            reX.debug('[SKINMANAGER] loaded default skin ' + skinID + ' with viewGroup ' + viewGroup, REX_DEBUG);
        }
            
        return this.skins[skinID];
    },
    
    getCurrentSkinForCurrentSection: function() {
        var key = reX.state.section.key;
        var viewGroup = mediaManager.getSectionInformations().viewGroup;
        if (!viewGroup) {
            viewGroup = reX.state.section.json[0]['@type'];
        }
        reX.debug('[SKINMANAGER] load skin for current section ' + key + ' and viewGroup' + viewGroup, REX_DEBUG);
        return this.getCurrentSkinForSection(key, viewGroup);
    },
    
    skins: undefined,
    
    default: {
        movie: 'defaultMedia',
        show: 'defaultMedia',
        season: 'defaultSeasons',
        episode: 'defaultMedia'
    }
    
});