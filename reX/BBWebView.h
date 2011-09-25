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
    VLCAudio *audio;
	NSBundle *resources;
    NSString *resourcePath;
    WebScriptObject *scriptObject;
	NSWindow *window;
	
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
- (BOOL)playNextInPlaylist;
- (BOOL)playPrevInPlaylist;
- (void)togglePlaymode;
- (void)stop;
- (void)jumpForward;
- (void)jumpBackward;
- (BOOL)isPlaying;
- (int)getProgress;
- (NSString *)getSkins;

+ (NSString *) webScriptNameForSelector:(SEL)sel;
+ (BOOL)isSelectorExcludedFromWebScript:(SEL)sel;

- (void)webView:(WebView *)sender didFinishLoadForFrame:(WebFrame *)frame;
- (void)webView:(WebView *)sender addMessageToConsole:(NSDictionary *)dictionary;

@end
