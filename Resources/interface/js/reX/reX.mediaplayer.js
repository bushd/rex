reX.MediaPlayer = new Class({
        
    initialize: function(options) {
    },
    
    playVideo: function(filepath, key) {
        js2objcBridge.playVideo(filepath, key);
    },
    
    playAudio: function(filepath, key) {
        js2objcBridge.playAudio(filepath, key);
    },
    
    playFromPlaylistWithIndex: function(index) {
    
    },
    
    play: function() {
        js2objcBridge.play();
    },
    
    isPlaying: function() {
        return js2objcBridge.isPlaying();
    },
    
    stop: function() {
        js2objcBridge.stop();
    },
    
    pause: function() {
        js2objcBridge.pause();
    },
    
    togglePlaymode: function() {
        js2objcBridge.togglePlaymode();
    },
    
    prev: function() {
        js2objcBridge.playPrevInPlaylist();
    },
    
    next: function() {
        js2objcBridge.playPrevInPlaylist();
    },
    
    shortjumpBack: function() {
        js2objcBridge.jumpBackward();
    },
    
    shortJumpForward: function() {
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
    
    getProgress: function(progress) {
        return js2objcBridge.getProgress(progress);
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