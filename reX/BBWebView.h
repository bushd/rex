//
//  BBWebView.h
//  reX
//
//  Created by Bastian Brodbeck on 27.02.11.
//  Copyright 2011 dmc digital media center GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <WebKit/WebKit.h>
#import <VLCKit/VLCKit.h>

@interface BBWebView : WebView {    
@private
    VLCVideoView *videoView;
    VLCMediaPlayer *player;
    VLCMediaListPlayer *mediaListPlayer;
    VLCMediaList *playlist;
    VLCAudio *audio;
	NSBundle *resources;
    NSString *resourcePath;
    WebScriptObject *scriptObject;
	NSWindow *window;
    NSUInteger volume;
    NSUInteger volumeStep;
    
    NSInteger playlistIndex;
	
	int seekPosition;
	
    BOOL goneBack;
}

- (BOOL)acceptsFirstResponder;
- (void)setVideoView:(VLCVideoView *)aView;
- (void)loadURL:(NSURL *)url;
- (void)loadHome;
- (void)setWindow:(NSWindow *)w;

- (void)webView:(WebView *)webView windowScriptObjectAvailable:(WebScriptObject *)windowScriptObject;
- (void)webView:(WebView *)sender didFinishLoadForFrame:(WebFrame *)frame;
- (NSUInteger)webView:(WebView *)sender dragDestinationActionMaskForDraggingInfo:(id <NSDraggingInfo>)draggingInfo;
- (NSUInteger)webView:(WebView *)sender dragSourceActionMaskForPoint:(NSPoint)point;
- (NSResponder *)webViewFirstResponder:(WebView *)sender;

- (void)mediaPlayerStateChanged:(NSNotification *)aNotification;
- (void)mediaPlayerTimeChanged:(NSNotification *)aNotification;

- (void)back;
- (void)playAudio:(NSString *)aPath;
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
- (NSString *)getSkins;
- (NSArray *)getSubtitles;
- (void)setSubtitle:(NSUInteger)index;
- (NSArray *)getAudiotracks;
- (void)setAudiotrack:(NSUInteger)index;
- (void)getSeekPosition;
- (void)setPlayerFramePositionX:(float)x positionY:(float)y width:(float)w height:(float)h;
- (BOOL)changeDisplaySettingsWithRefreshRate:(int)refresh;
- (int)getPlaytime;


+ (NSString *) webScriptNameForSelector:(SEL)sel;
+ (BOOL)isSelectorExcludedFromWebScript:(SEL)sel;

- (void)webView:(WebView *)sender didFinishLoadForFrame:(WebFrame *)frame;
- (void)webView:(WebView *)sender addMessageToConsole:(NSDictionary *)dictionary;

@end
