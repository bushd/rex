js2objcBridge = {


  back: function() {},
  playAudio: function (str) {},

/*
- (void)playVideo:(NSString *)aPath withKey:(NSString *)key;
- (void)addFileToPlaylist:(NSString *)aPath;
- (void)playNextInPlaylist;
- (void)playPrevInPlaylist;
- (void)togglePlaymode;
- (void)stop;
- (void)jumpForward;
- (void)jumpBackward;
- (void)volumeUp;
- (void)volumeDown;
- (void)toggleMute;
- (BOOL)isMuted;
- (void)setVolume:(NSUInteger)vol;
- (NSUInteger)getVolume;
- (BOOL)isPlaying;
- (int)getProgress;
- (void)setProgress:(int)p;
- (NSString *)getSkins;
- (NSArray *)getSubtitles;
- (void)setSubtitle:(NSUInteger)index;
- (NSArray *)getAudiotracks;
- (void)setAudiotrack:(NSUInteger)index;
- (void)getSeekPosition;
- (void)setPlayerFramePositionX:(float)x positionY:(float)y width:(float)w height:(float)h;
- (BOOL)changeDisplaySettingsWithRefreshRate:(int)refresh;
- (int)getPlaytime;
- (void)quitApp;
- (void)savePreferences:(NSString *)prefs;
- (NSString *)loadPreferences;
*/
  loadPreferences: function() { return '';}

};