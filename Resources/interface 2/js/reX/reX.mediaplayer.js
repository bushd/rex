reX.MediaPlayer = new Class({
        
    Implements: Debug,

    initialize: function(options) {
        self = this;
        self.log('[PLAYER] initialize',REX_DEBUG);
    },
 
    playVideo: function(filepath, key) {
        self.log('[PLAYER] play Video ' + filepath + ' with key '+key ,REX_DEBUG);
        js2objcBridge.playVideo(filepath, key);
    },
    
    playAudio: function(filepath, key) {
        self.log('[PLAYER] play Audio ' + filepath + ' with key '+key ,REX_DEBUG);
        js2objcBridge.playAudio(filepath, key);
    },
    
    playFromPlaylistWithIndex: function(index) {
    
    },
    
    play: function() {
        self.log('[PLAYER] play',REX_DEBUG);
        js2objcBridge.play();
    },
    
    isPlaying: function() {
        var reuslt = js2objcBridge.isPlaying();
        self.log('[PLAYER] is Playing? '+result,REX_DEBUG);
        return result;
    },
    
    stop: function() {
        self.log('[PLAYER] stop',REX_DEBUG);
        js2objcBridge.stop();
    },
    
    pause: function() {
        self.log('[PLAYER] pause',REX_DEBUG);
        js2objcBridge.pause();
    },
    
    togglePlaymode: function() {
        self.log('[PLAYER] toggle',REX_DEBUG);
        js2objcBridge.togglePlaymode();
    },
    
    prev: function() {
        self.log('[PLAYER] play previous in Playlist',REX_DEBUG);
        js2objcBridge.playPrevInPlaylist();
    },

    next: function() {
        self.log('[PLAYER] play next in Playlist',REX_DEBUG);
        js2objcBridge.playPrevInPlaylist();
    },
    
    shortjumpBack: function() {
        self.log('[PLAYER] jump backwards',REX_DEBUG);
        js2objcBridge.jumpBackward();
    },
    
    shortjumpForward: function() {
        self.log('[PLAYER] jump forwards',REX_DEBUG);
        js2objcBridge.jumpForward();
    },
    
    longjumpBack: function() {},
    
    longjumpForward: function() {},
    
    speedUp: function() {},
    
    slowDown: function() {},
    
    getPlaylist: function() {},
    
    addToPlaylist: function(json) {},
    
    addArrayToPlaylist: function(json) {},
        
    prependToPlaylist: function(json) {},
    
    prependArrayToPlaylist: function(array) {},
    
    getPlaylistItemAtIndex: function(index) {},
    
    shuffle: function(mode) {},
    
    getProgress: function() {
        var result = js2objcBridge.getProgress()
        self.log('[PLAYER] progess = '+result,REX_DEBUG);
        return result;
    },
    
    setProgress: function(progress) {
        self.log('[PLAYER] set progress to '+progress,REX_DEBUG);
        return js2objcBridge.setProgress(progress);
    },
    
    getSeekPosition: function() {
        return js2objcBridge.getSeekPosition();
    },
    
    getPlaytime: function() {
        return js2objcBridge.getPlaytime();
    },
    
    getSubtitles: function() {
        return js2objcBridge.getSubtitles();
    },
    
    setSubtitle: function(index) {
        self.log('[PLAYER] set subtitle index to '+index,REX_DEBUG);
        js2objcBridge.setSubtitle(index);
    },
    
    getAudiotracks: function() {
        return js2objcBridge.getAudiotracks();
    },
    
    setAudiotrack: function(index) {
        js2objcBridge.setAudiotrack(index);
    },
    
    volumeUp: function() {
        js2objcBridge.volumeUp();
    },
        
    volumeDown: function() {
        js2objcBridge.volumeDown();
    },
        
    toggleMute: function() {
        js2objcBridge.toggleMute();
    },
        
    isMuted: function() {
        js2objcBridge.isMuted();
    },
        
    setVolume: function(vol) {
        js2objcBridge.setVolume(vol);
    },
        
    getVolume: function() {
        return js2objcBridge.getVolume();
    },
    
    playlist: []
});